import { useState, useRef, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Send,
  User,
  Bot,
  Paperclip,
  X,
  FileText,
  Image as ImageIcon
} from "lucide-react"

import { postToServer, getFromServer, postMultipart } from "@/utils/axios"
import ApiList from "@/components/pages/general/api-list"
import io from 'socket.io-client'
import { useAuth } from "@/components/pages/general/AuthContext"

const ChatModal = ({ isOpen, onClose, provider }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [attachments, setAttachments] = useState([])
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const [conversation, setConversation] = useState(null)
  const [typing, setTyping] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const socketRef = useRef(null)
  const [conversations, setConversations] = useState([])
  const { principal } = useAuth()

  useEffect(() => {
    const tokenUser = localStorage.getItem('token')
    if (!provider || !isOpen || !tokenUser) return
    ;(async () => {
      try {
        const meType = localStorage.getItem('user') ? 'user' : 'provider'
        const peerType = 'provider'
        const ensure = await postToServer(ApiList.API_URL_CHAT_ENSURE_CONVERSATION, { peerType, peerId: String(provider.id || provider._id) })
        const convo = ensure?.data?.conversation || ensure.conversation || ensure
        setConversation(convo)
        const msgs = await getFromServer(`${ApiList.API_URL_CHAT_MESSAGES}/${convo._id}`)
        setMessages((msgs?.data?.messages || msgs.messages || msgs).map(m => ({
          id: m._id,
          text: m.content,
          sender: m.senderType === 'provider' ? 'provider' : 'user',
          timestamp: new Date(m.createdAt),
          attachments: m.attachments || [],
          readBy: m.readBy || []
        })))
        // mark as read on open
        try { await postToServer(`${ApiList.API_URL_CHAT_MESSAGES}/read/${convo._id}`, {}) } catch (_) {}

        // Load conversations list for sidebar
        try {
          const convs = await getFromServer(ApiList.API_URL_CHAT_CONVERSATIONS)
          setConversations(convs?.data?.conversations || convs.conversations || [])
        } catch (_) {}

        // init socket
        if (!socketRef.current) {
          socketRef.current = io('/', { path: '/socket.io', auth: { token: tokenUser } })
          socketRef.current.on('chat:new_message', ({ message }) => {
            if (message.conversationId !== convo._id) return
            setMessages(prev => [...prev, {
              id: message._id,
              text: message.content,
              sender: message.senderType === 'provider' ? 'provider' : 'user',
              timestamp: new Date(message.createdAt),
              attachments: message.attachments || [],
              readBy: message.readBy || []
            }])
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
          })
          socketRef.current.on('chat:read', ({ conversationId, reader }) => {
            if (conversationId !== convo._id) return
            setMessages(prev => prev.map(m => {
              const exists = (m.readBy || []).some(r => r.readerType === reader.participantType && String(r.readerId) === String(reader.participantId))
              return exists ? m : { ...m, readBy: [ ...(m.readBy||[]), { readerType: reader.participantType, readerId: reader.participantId, readAt: new Date() } ] }
            }))
          })
          socketRef.current.on('chat:typing', ({ conversationId, isTyping }) => {
            if (conversationId === convo._id) {
              setTyping(!!isTyping)
              if (isTyping) {
                setShowTyping(true)
                setTimeout(() => setShowTyping(false), 1500)
              }
            }
          })
        }
        socketRef.current?.emit('chat:join', { conversationId: convo._id })
      } catch (e) {
        console.error('Chat init error:', e)
      }
    })()
  }, [provider, isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleFileSelect = e => {
    const files = Array.from(e.target.files || [])

    files.forEach(file => {
      // Check file type and size
      const allowedTypes = [
        "image/",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ]
      const isAllowed = allowedTypes.some(type => file.type.startsWith(type))

      if (!isAllowed) {
        alert("Only images, PDF, and Word documents are allowed")
        return
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        alert("File size must be less than 10MB")
        return
      }

      const form = new FormData()
      form.append('file', file)
      postMultipart(ApiList.API_URL_UPLOAD_CHAT, form, 'VIEW')
        .then((res) => {
          const data = res?.data || res
          const attachment = {
            id: Date.now().toString() + Math.random(),
            name: data.name || file.name,
            type: file.type.startsWith('image/') ? 'image' : 'file',
            size: data.size || file.size,
            url: data.url
          }
          setAttachments(prev => [...prev, attachment])
        })
        .catch(() => {})
    })

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeAttachment = id => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id)
      if (attachment) {
        URL.revokeObjectURL(attachment.url)
      }
      return prev.filter(a => a.id !== id)
    })
  }

  const handleSendMessage = async e => {
    e.preventDefault()
    if (!newMessage.trim() && attachments.length === 0) return
    if (!conversation) return
    const payload = {
      conversationId: conversation._id,
      content: newMessage,
      attachments: attachments.map(a => ({ url: a.url, type: a.type || 'file', name: a.name, size: a.size })),
      receiverType: 'provider',
      receiverId: String(provider.id || provider._id),
    }
    try {
      const sent = await postToServer(ApiList.API_URL_CHAT_MESSAGES, payload)
      const m = sent?.data?.message || sent.message || sent
      setMessages(prev => [
        ...prev,
        {
          id: m._id,
          text: m.content,
          sender: 'user',
          timestamp: new Date(m.createdAt || Date.now()),
          attachments: m.attachments || []
        }
      ])
      setNewMessage("")
      setAttachments([])
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    } catch (err) {
      console.error('Send message error:', err)
    }
  }

  useEffect(() => {
    if (!socketRef.current || !conversation) return
    const id = setTimeout(() => {
      socketRef.current.emit('chat:typing', { conversationId: conversation._id, isTyping: !!newMessage })
    }, 200)
    return () => clearTimeout(id)
  }, [newMessage, conversation])

  const formatFileSize = bytes => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = type => {
    if (type.startsWith("image/")) return ImageIcon
    return FileText
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-4xl h-[640px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              {provider?.image && (
                <img src={provider.image} alt={provider?.name || 'Provider'} className="w-8 h-8 rounded-full object-cover" />
              )}
              <span>Chat {provider?.name ? `with ${provider.name}` : ''}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden bg-white rounded-md">
          <div className="flex h-full">
            {/* Sidebar conversations */}
            <aside className="hidden md:block w-72 border-r overflow-y-auto p-3">
              <div className="text-sm font-semibold mb-2">Conversations</div>
              <div className="space-y-1">
                {conversations.map(c => {
                  const last = c.lastMessage
                  const unread = c.unreadCount || 0
                  const active = conversation?._id === c._id
                  return (
                    <button key={c._id} onClick={async () => {
                      try {
                        const msgs = await getFromServer(`${ApiList.API_URL_CHAT_MESSAGES}/${c._id}`)
                        setConversation(c)
                        setMessages((msgs?.data?.messages || msgs.messages || msgs).map(m => ({
                          id: m._id,
                          text: m.content,
                          sender: m.senderType === 'provider' ? 'provider' : 'user',
                          timestamp: new Date(m.createdAt),
                          attachments: m.attachments || [],
                          readBy: m.readBy || []
                        })))
                        await postToServer(`${ApiList.API_URL_CHAT_MESSAGES}/read/${c._id}`, {})
                        socketRef.current?.emit('chat:join', { conversationId: c._id })
                      } catch(e) {}
                    }} className={`w-full text-left p-2 rounded flex items-center justify-between ${active ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                      <div>
                        <div className="text-sm font-medium">{c.title || 'Conversation'}</div>
                        {last && <div className="text-xs text-gray-500 truncate max-w-[180px]">{last.content}</div>}
                      </div>
                      {unread > 0 && <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-blue-600 text-white text-xs">{unread}</span>}
                    </button>
                  )
                })}
              </div>
            </aside>

            {/* Thread */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 p-4">
                {messages.map((message, idx) => {
                  const prev = messages[idx - 1]
                  const prevDate = prev ? new Date(prev.timestamp).toDateString() : null
                  const thisDate = new Date(message.timestamp).toDateString()
                  const showDivider = !prev || prevDate !== thisDate
                  const isMine = message.sender !== 'provider'
                  const otherType = 'provider'
                  const isRead = (message.readBy || []).some(r => r.readerType === otherType)
                  return (
                    <div key={message.id}>
                      {showDivider && (
                        <div className="text-center my-2"><span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{thisDate}</span></div>
                      )}
                      <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        {!isMine && (
                          <img src={provider?.image} alt="" className="w-6 h-6 rounded-full mr-2 self-end hidden sm:block" />
                        )}
                        <div className={`max-w-[80%] rounded-2xl p-3 shadow ${isMine ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-900 rounded-bl-sm'}`}>
                          {message.text && <p className="text-sm mb-1">{message.text}</p>}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="space-y-2">
                              {message.attachments.map(attachment => (
                                <div key={attachment.id} className="flex items-center gap-2 p-2 bg-white/20 rounded text-xs">
                                  <span className="flex-1 truncate">{attachment.name}</span>
                                  <a href={attachment.url} target="_blank" rel="noreferrer" className="underline">Open</a>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-1 opacity-75">
                            <span className="text-[10px]">{new Date(message.timestamp).toLocaleTimeString()}</span>
                            {isMine && (
                              <span className="text-[10px] flex items-center gap-0.5">
                                <span>✓</span>
                                <span className={`${isRead ? 'text-white' : 'text-gray-300'}`}>✓</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
                {showTyping && (
                  <div className="text-xs text-gray-500 italic">Typing…</div>
                )}
              </div>

              {/* Composer */}
              <form onSubmit={handleSendMessage} className="flex gap-2 p-3 border-t bg-white">
                <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileSelect} className="hidden" />
                <Button type="button" size="icon" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type your message..." className="flex-1 rounded-full" />
                <Button type="submit" size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChatModal