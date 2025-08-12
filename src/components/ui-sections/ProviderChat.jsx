import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Send, Paperclip } from 'lucide-react'
import io from 'socket.io-client'
import { getFromServer, postMultipart, postToServer } from '@/utils/axios'
import ApiList from '@/components/pages/general/api-list'

const ProviderChat = () => {
  const [conversations, setConversations] = useState([])
  const [current, setCurrent] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loadingConvos, setLoadingConvos] = useState(false)
  const [loadingThread, setLoadingThread] = useState(false)
  const fileRef = useRef(null)
  const socketRef = useRef(null)
  const endRef = useRef(null)

  const scrollToEnd = () => endRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => { scrollToEnd() }, [messages])

  const bootstrapSocket = () => {
    const token = localStorage.getItem('token')
    if (socketRef.current || !token) return
    socketRef.current = io('/', { path: '/socket.io', auth: { token } })
    socketRef.current.on('chat:new_message', ({ message }) => {
      if (!current || message.conversationId !== current._id) return
      setMessages(prev => ([
        ...prev,
        {
          id: message._id,
          text: message.content,
          sender: message.senderType === 'provider' ? 'me' : 'peer',
          timestamp: new Date(message.createdAt),
          attachments: message.attachments || [],
          readBy: message.readBy || []
        }
      ]))
      scrollToEnd()
    })
    socketRef.current.on('chat:read', ({ conversationId, reader }) => {
      if (!current || conversationId !== current._id) return
      setMessages(prev => prev.map(m => {
        const exists = (m.readBy || []).some(r => r.readerType === reader.participantType && String(r.readerId) === String(reader.participantId))
        return exists ? m : { ...m, readBy: [ ...(m.readBy||[]), { readerType: reader.participantType, readerId: reader.participantId, readAt: new Date() } ] }
      }))
    })
  }

  const loadConversations = async () => {
    try {
      setLoadingConvos(true)
      const res = await getFromServer(ApiList.API_URL_CHAT_CONVERSATIONS)
      setConversations(res?.data?.conversations || res.conversations || [])
    } finally {
      setLoadingConvos(false)
    }
  }

  const openConversation = async (convo) => {
    try {
      setCurrent(convo)
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
      scrollToEnd()
    } finally {
      setLoadingThread(false)
    }
  }

  useEffect(() => { loadConversations() }, [])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!current || !newMessage.trim()) return
    const provider = localStorage.getItem('provider')
    const providerId = provider ? (JSON.parse(provider)._id || JSON.parse(provider).id) : null
    // find peer in participants
    const other = (current.participants || []).find(p => p.participantType === 'user')
    if (!other) return
    const payload = {
      conversationId: current._id,
      content: newMessage,
      attachments: [],
      receiverType: 'user',
      receiverId: String(other.participantId),
    }
    const sent = await postToServer(ApiList.API_URL_CHAT_MESSAGES, payload)
    const m = sent?.data?.message || sent.message || sent
    setMessages(prev => ([
      ...prev,
      { id: m._id, text: m.content, sender: 'me', timestamp: new Date(m.createdAt || Date.now()), attachments: m.attachments || [], readBy: m.readBy || [] }
    ]))
    setNewMessage('')
    scrollToEnd()
  }

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!current || files.length === 0) return
    const other = (current.participants || []).find(p => p.participantType === 'user')
    for (const file of files) {
      const fd = new FormData()
      fd.append('file', file)
      const up = await postMultipart(ApiList.API_URL_UPLOAD_CHAT, fd, 'VIEW')
      const payload = {
        conversationId: current._id,
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Sidebar */}
      <Card className="md:col-span-4 p-3 h-[70vh] overflow-y-auto">
        <div className="text-sm font-semibold mb-2">Conversations</div>
        {loadingConvos && <div className="text-sm text-muted-foreground">Loading…</div>}
        <div className="space-y-1">
          {conversations.map(c => {
            const last = c.lastMessage
            const unread = c.unreadCount || 0
            const active = current?._id === c._id
            return (
              <button key={c._id} onClick={() => openConversation(c)} className={`w-full text-left p-2 rounded flex items-center justify-between ${active ? 'bg-blue-50' : 'hover:bg-muted'}`}>
                <div>
                  <div className="text-sm font-medium">Customer</div>
                  {last && <div className="text-xs text-muted-foreground truncate max-w-[180px]">{last.content || 'Attachment'}</div>}
                </div>
                {unread > 0 && <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-blue-600 text-white text-xs">{unread}</span>}
              </button>
            )
          })}
        </div>
      </Card>

      {/* Thread */}
      <Card className="md:col-span-8 flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!current && <div className="text-sm text-muted-foreground">Select a conversation to start messaging.</div>}
          {messages.map((m, idx) => {
            const prev = messages[idx-1]
            const showDate = !prev || new Date(prev.timestamp).toDateString() !== new Date(m.timestamp).toDateString()
            const isMine = m.sender === 'me'
            return (
              <div key={m.id}>
                {showDate && (
                  <div className="text-center my-2"><span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{new Date(m.timestamp).toDateString()}</span></div>
                )}
                <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl p-3 shadow ${isMine ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-muted text-foreground rounded-bl-sm'}`}>
                    {m.text && <p className="text-sm mb-1">{m.text}</p>}
                    {m.attachments && m.attachments.length > 0 && (
                      <div className="space-y-2">
                        {m.attachments.map((a, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-white/20 rounded text-xs">
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
        </div>

        {/* Composer */}
        <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
          <input ref={fileRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleUpload} className="hidden" />
          <Button type="button" variant="outline" size="icon" onClick={() => fileRef.current?.click()}>
            <Paperclip className="w-4 h-4" />
          </Button>
          <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message…" className="rounded-full" />
          <Button type="submit" size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4 text-white" />
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default ProviderChat

