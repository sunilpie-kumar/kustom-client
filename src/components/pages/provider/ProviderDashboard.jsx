import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Settings,
  BarChart3,
  Users,
  LogOut,
  CheckCircle2,
  Clock,
  XCircle,
  Paperclip,
  Send
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import io from 'socket.io-client'
import { getFromServer, postMultipart, postToServer } from "@/utils/axios"
import ApiList from "@/components/pages/general/api-list"
import { useAuth } from "@/components/pages/general/AuthContext"

const ProviderDashboard = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { logout } = useAuth()
  const [provider, setProvider] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [conversations, setConversations] = useState([])
  const [filteredConvos, setFilteredConvos] = useState([])
  const [unreadTotal, setUnreadTotal] = useState(0)
  const [currentConvo, setCurrentConvo] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loadingConvos, setLoadingConvos] = useState(false)
  const [loadingThread, setLoadingThread] = useState(false)
  const fileRef = useRef(null)
  const endRef = useRef(null)
  const socketRef = useRef(null)
  const [typing, setTyping] = useState(false)
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    document.title = "Provider Dashboard | Profile, Analytics, Messages"
    const meta = document.querySelector('meta[name="description"]')
    const content = "Provider dashboard with profile, analytics, bookings, and real-time messages."
    if (meta) meta.setAttribute('content', content)
    else {
      const m = document.createElement('meta')
      m.name = 'description'
      m.content = content
      document.head.appendChild(m)
    }
  }, [])

  useEffect(() => {
    const storedProvider = localStorage.getItem("provider")
    if (!storedProvider) {
      navigate("/provider-auth")
      return
    }
    try {
      const providerData = JSON.parse(storedProvider)
      setProvider(providerData)
    } catch {
      navigate("/provider-auth")
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  const handleLogout = async () => {
    await logout()
    toast({ title: "Logged Out", description: "You have been successfully logged out." })
    navigate("/", { replace: true })
  }

  const scrollToEnd = () => endRef.current?.scrollIntoView({ behavior: 'smooth' })

  const bootstrapSocket = () => {
    const token = localStorage.getItem('token')
    if (socketRef.current || !token) return
    socketRef.current = io('/', { path: '/socket.io', auth: { token } })
    socketRef.current.on('chat:new_message', async ({ message }) => {
      if (currentConvo && message.conversationId === currentConvo._id) {
        setMessages(prev => ([...prev, {
          id: message._id,
          text: message.content,
          sender: message.senderType === 'provider' ? 'me' : 'peer',
          timestamp: new Date(message.createdAt),
          attachments: message.attachments || [],
          readBy: message.readBy || []
        }]))
        scrollToEnd()
        try {
          await postToServer(`${ApiList.API_URL_CHAT_MESSAGES}/read/${currentConvo._id}`, {})
          setConversations(prev => prev.map(c => c._id === currentConvo._id ? { ...c, unreadCount: 0 } : c))
          setFilteredConvos(prev => prev.map(c => c._id === currentConvo._id ? { ...c, unreadCount: 0 } : c))
          recomputeUnreadTotal(conversations.map(c => c._id === currentConvo._id ? { ...c, unreadCount: 0 } : c))
        } catch {}
      } else {
        setConversations(prev => prev.map(c => c._id === message.conversationId ? { ...c, unreadCount: (c.unreadCount || 0) + 1 } : c))
        setFilteredConvos(prev => prev.map(c => c._id === message.conversationId ? { ...c, unreadCount: (c.unreadCount || 0) + 1 } : c))
        recomputeUnreadTotal(conversations)
      }
    })
    socketRef.current.on('chat:read', ({ conversationId, reader }) => {
      if (!currentConvo || conversationId !== currentConvo._id) return
      setMessages(prev => prev.map(m => {
        const exists = (m.readBy || []).some(r => r.readerType === reader.participantType && String(r.readerId) === String(reader.participantId))
        return exists ? m : { ...m, readBy: [ ...(m.readBy||[]), { readerType: reader.participantType, readerId: reader.participantId, readAt: new Date() } ] }
      }))
    })
    socketRef.current.on('chat:typing', ({ conversationId, isTyping }) => {
      if (!currentConvo || conversationId !== currentConvo._id) return
      setTyping(!!isTyping)
      if (isTyping) {
        setShowTyping(true)
        setTimeout(() => setShowTyping(false), 1500)
      }
    })
  }

  const recomputeUnreadTotal = (convs) => {
    const total = (convs || []).reduce((acc, c) => acc + (c.unreadCount || 0), 0)
    setUnreadTotal(total)
  }

  const loadConversations = async () => {
    try {
      setLoadingConvos(true)
      const res = await getFromServer(ApiList.API_URL_CHAT_CONVERSATIONS)
      const convs = res?.data?.conversations || res.conversations || []
      setConversations(convs)
      setFilteredConvos(convs)
      recomputeUnreadTotal(convs)
    } finally {
      setLoadingConvos(false)
    }
  }

  const openConversation = async (convo) => {
    try {
      setCurrentConvo(convo)
      setLoadingThread(true)
      const msgs = await getFromServer(`${ApiList.API_URL_CHAT_MESSAGES}/${convo._id}`)
      setMessages((msgs?.data?.messages || msgs.messages || msgs).map(m => ({
        id: m._id,
        text: m.content,
        sender: m.senderType === 'provider' ? 'me' : 'peer',
        timestamp: new Date(m.createdAt),
        attachments: m.attachments || [],
        readBy: m.readBy || []
      })))
      bootstrapSocket()
      socketRef.current?.emit('chat:join', { conversationId: convo._id })
      await postToServer(`${ApiList.API_URL_CHAT_MESSAGES}/read/${convo._id}`, {})
      setConversations(prev => prev.map(c => c._id === convo._id ? { ...c, unreadCount: 0 } : c))
      setFilteredConvos(prev => prev.map(c => c._id === convo._id ? { ...c, unreadCount: 0 } : c))
      recomputeUnreadTotal(conversations.map(c => c._id === convo._id ? { ...c, unreadCount: 0 } : c))
      scrollToEnd()
    } finally {
      setLoadingThread(false)
    }
  }

  useEffect(() => { loadConversations() }, [])

  useEffect(() => {
    if (!socketRef.current || !currentConvo) return
    const id = setTimeout(() => {
      socketRef.current.emit('chat:typing', { conversationId: currentConvo._id, isTyping: !!newMessage })
    }, 200)
    return () => clearTimeout(id)
  }, [newMessage, currentConvo])

  const handleSendMsg = async (e) => {
    e.preventDefault()
    if (!currentConvo || !newMessage.trim()) return
    const other = (currentConvo.participants || []).find(p => p.participantType === 'user')
    const payload = {
      conversationId: currentConvo._id,
      content: newMessage,
      attachments: [],
      receiverType: 'user',
      receiverId: String(other.participantId),
    }
    const sent = await postToServer(ApiList.API_URL_CHAT_MESSAGES, payload)
    const m = sent?.data?.message || sent.message || sent
    setMessages(prev => ([...prev, { id: m._id, text: m.content, sender: 'me', timestamp: new Date(m.createdAt || Date.now()), attachments: m.attachments || [], readBy: m.readBy || [] }]))
    setNewMessage('')
    scrollToEnd()
  }

  const handleUploadChat = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!currentConvo || files.length === 0) return
    const other = (currentConvo.participants || []).find(p => p.participantType === 'user')
    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      const up = await postMultipart(ApiList.API_URL_UPLOAD_CHAT, fd, 'VIEW')
      const payload = {
        conversationId: currentConvo._id,
        content: '',
        attachments: [{ url: up?.data?.url || up.url, name: file.name, size: file.size, type: file.type.startsWith('image/') ? 'image' : 'file' }],
        receiverType: 'user',
        receiverId: String(other.participantId),
      }
      const sent = await postToServer(ApiList.API_URL_CHAT_MESSAGES, payload)
      const m = sent?.data?.message || sent.message || sent
      setMessages(prev => ([...prev, { id: m._id, text: '', sender: 'me', timestamp: new Date(m.createdAt || Date.now()), attachments: m.attachments || [], readBy: m.readBy || [] }]))
      scrollToEnd()
    }
    e.target.value = ''
  }

  const getStatusBadge = status => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-600/15 text-green-700 dark:text-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-600/15 text-yellow-700 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-600/15 text-red-700 dark:text-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!provider) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 py-8 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 shadow">
                <AvatarImage src={provider.image} alt={`Avatar of ${provider.name}`} />
                <AvatarFallback className="text-lg">{provider.name?.[0] || 'P'}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome back, {provider.name}!</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>{provider.company_name || provider.businessName || 'Your Business'}</span>
                  <span className="mx-1">•</span>
                  {getStatusBadge(provider.status)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Card className="border-none shadow-md bg-card/80 backdrop-blur">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Unread Messages</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">{unreadTotal}</div></CardContent>
            </Card>
            <Card className="border-none shadow-md bg-card/80 backdrop-blur">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Bookings</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">142</div></CardContent>
            </Card>
            <Card className="border-none shadow-md bg-card/80 backdrop-blur">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Rating</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">4.8</div></CardContent>
            </Card>
            <Card className="border-none shadow-md bg-card/80 backdrop-blur">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Response Time</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">~3m</div></CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Status Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Account Status</CardTitle>
                  <CardDescription>
                    Current status of your provider account
                  </CardDescription>
                </div>
                {getStatusBadge(provider.status)}
              </div>
            </CardHeader>
            <CardContent>
              {provider.status === "pending" && (
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <p className="text-yellow-800 dark:text-yellow-200">
                    Your account is currently under review. We'll notify you once it's approved.
                  </p>
                </div>
              )}
              {provider.status === "approved" && (
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <p className="text-green-800 dark:text-green-200">
                    Congratulations! Your account is approved and active.
                  </p>
                </div>
              )}
              {provider.status === "rejected" && (
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                  <p className="text-red-800 dark:text-red-200">
                    Your account was not approved. Please contact support for more information.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="w-full flex flex-wrap gap-1 bg-card/80 backdrop-blur border rounded-2xl p-0.5 shadow">
            <TabsTrigger value="profile" className="relative h-10 rounded-xl px-4 py-0 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border data-[state=active]:ring-1 data-[state=active]:ring-primary/20">
              <User className="w-4 h-4 mr-2"/> Profile
            </TabsTrigger>
            <TabsTrigger value="analytics" className="relative h-10 rounded-xl px-4 py-0 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border data-[state=active]:ring-1 data-[state=active]:ring-primary/20">
              <BarChart3 className="w-4 h-4 mr-2"/> Analytics
            </TabsTrigger>
            <TabsTrigger value="bookings" className="relative h-10 rounded-xl px-4 py-0 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border data-[state=active]:ring-1 data-[state=active]:ring-primary/20">
              <Users className="w-4 h-4 mr-2"/> Bookings
            </TabsTrigger>
            <TabsTrigger value="settings" className="relative h-10 rounded-xl px-4 py-0 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border data-[state=active]:ring-1 data-[state=active]:ring-primary/20">
              <Settings className="w-4 h-4 mr-2"/> Settings
            </TabsTrigger>
            <TabsTrigger value="chat" className="relative h-10 rounded-xl px-4 py-0 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-border data-[state=active]:ring-1 data-[state=active]:ring-primary/20">
              Messages
              {unreadTotal > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-xs">
                  {unreadTotal}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{provider.email}</p>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{provider.phone}</p>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {new Date(provider.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Business Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{provider.company_name}</p>
                      <p className="text-sm text-muted-foreground">Company Name</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{provider.service_type}</p>
                      <p className="text-sm text-muted-foreground">Service Type</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{provider.location}</p>
                      <p className="text-sm text-muted-foreground">Location</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{provider.experience_years} years</p>
                      <p className="text-sm text-muted-foreground">Experience</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Business Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {provider.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Based on 89 reviews</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Your latest booking requests and appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">No bookings yet</p>
                  <p className="text-sm text-muted-foreground">
                    Once customers start booking your services, they'll appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile Information
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Building2 className="h-4 w-4 mr-2" />
                    Business Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Sidebar */}
              <Card className="md:col-span-4 h-[70vh] overflow-hidden">
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold">Conversations</div>
                    {unreadTotal > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-xs">
                        {unreadTotal}
                      </span>
                    )}
                  </div>
                  <Input
                    placeholder="Search…"
                    className="mb-2"
                    onChange={(e) => {
                      const q = e.target.value.toLowerCase()
                      setFilteredConvos(conversations.filter(c => {
                        const last = c.lastMessage?.content || ''
                        return last.toLowerCase().includes(q)
                      }))
                    }}
                  />
                </div>
                <Separator />
                <ScrollArea className="h-[calc(70vh-110px)] p-3">
                  {loadingConvos && <div className="text-sm text-muted-foreground mb-2">Loading…</div>}
                  <div className="space-y-1">
                    {(filteredConvos.length ? filteredConvos : conversations).map(c => {
                      const last = c.lastMessage
                      const unread = c.unreadCount || 0
                      const active = currentConvo?._id === c._id
                      return (
                        <button
                          key={c._id}
                          onClick={() => openConversation(c)}
                          className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors
                            ${active ? 'bg-accent text-accent-foreground ring-1 ring-primary/20' : 'hover:bg-muted'}
                          `}
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-medium">Customer</div>
                            {last && (
                              <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                                {last.content || 'Attachment'}
                              </div>
                            )}
                          </div>
                          {unread > 0 && (
                            <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-primary text-primary-foreground text-xs">
                              {unread}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </ScrollArea>
              </Card>

              {/* Thread */}
              <Card className="md:col-span-8 flex flex-col h-[70vh] overflow-hidden">
                <ScrollArea className="flex-1 p-4">
                  {!currentConvo && (
                    <div className="text-sm text-muted-foreground">Select a conversation to start messaging.</div>
                  )}
                  <div className="space-y-3">
                    {messages.map((m, idx) => {
                      const prev = messages[idx-1]
                      const showDate = !prev || new Date(prev.timestamp).toDateString() !== new Date(m.timestamp).toDateString()
                      const isMine = m.sender === 'me'
                      return (
                        <div key={m.id}>
                          {showDate && (
                            <div className="text-center my-2">
                              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                {new Date(m.timestamp).toDateString()}
                              </span>
                            </div>
                          )}
                          <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                            {!isMine && (
                              <Avatar className="h-6 w-6 mr-2 self-end hidden sm:flex">
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                            )}
                            <div className={`max-w-[75%] rounded-2xl p-3 shadow
                              ${isMine ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted text-foreground rounded-bl-sm'}
                            `}>
                              {m.text && <p className="text-sm mb-1 break-words">{m.text}</p>}
                              {m.attachments?.length > 0 && (
                                <div className="space-y-2">
                                  {m.attachments.map((a, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 bg-background/60 border rounded text-xs">
                                      <span className="flex-1 truncate">{a.name}</span>
                                      <a href={a.url} target="_blank" rel="noreferrer" className="underline">Open</a>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="flex items-center gap-2 mt-1 opacity-75">
                                <span className="text-[10px]">{new Date(m.timestamp).toLocaleTimeString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={endRef} />
                    {showTyping && (
                      <div className="text-xs text-muted-foreground italic">Typing…</div>
                    )}
                  </div>
                </ScrollArea>

                {/* Composer */}
                <form onSubmit={handleSendMsg} className="p-3 border-t flex gap-2">
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleUploadChat}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" size="icon" className="rounded-full" onClick={() => fileRef.current?.click()}>
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message…"
                    className="rounded-full"
                  />
                  <Button type="submit" size="icon" className="rounded-full" aria-label="Send">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProviderDashboard