import { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const getFileIcon = (type) => {
  if (type.startsWith('image/')) return <ImageIcon fontSize="small" />;
  return <InsertDriveFileIcon fontSize="small" />;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ChatModal = ({ isOpen, onClose, provider }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (provider && isOpen) {
      setMessages([
        {
          id: '1',
          text: `Hello! I'm ${provider.name} from ${provider.businessName}. How can I help you today?`,
          sender: 'provider',
          timestamp: new Date(),
        },
      ]);
    }
  }, [provider, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const allowedTypes = [
        'image/',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      const isAllowed = allowedTypes.some((type) => file.type.startsWith(type));
      if (!isAllowed) {
        alert('Only images, PDF, and Word documents are allowed');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      const attachment = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      };
      setAttachments((prev) => [...prev, attachment]);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => {
      const attachment = prev.find((a) => a.id === id);
      if (attachment) {
        URL.revokeObjectURL(attachment.url);
      }
      return prev.filter((a) => a.id !== id);
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() && attachments.length === 0) return;
    const userMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setAttachments([]);
    setTimeout(() => {
      const providerResponse = {
        id: (Date.now() + 1).toString(),
        text:
          attachments.length > 0
            ? "Thank you for sharing those files! I'll review them and get back to you with detailed information about our services."
            : "Thank you for your message! I'll get back to you shortly with more details about our services.",
        sender: 'provider',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, providerResponse]);
    }, 1000);
  };

  if (!provider) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={provider.image} alt={provider.name} />
          <Typography variant="h6">Chat with {provider.name}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ height: 600, display: 'flex', flexDirection: 'column', p: 0 }}>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          {messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '80%',
                  borderRadius: 2,
                  p: 2,
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                  color: message.sender === 'user' ? '#fff' : 'text.primary',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {message.sender === 'user' ? (
                    <PersonIcon fontSize="small" />
                  ) : (
                    <SupportAgentIcon fontSize="small" />
                  )}
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </Box>
                {message.text && (
                  <Typography variant="body2" sx={{ mb: message.attachments ? 1 : 0 }}>
                    {message.text}
                  </Typography>
                )}
                {message.attachments &&
                  message.attachments.length > 0 &&
                  message.attachments.map((attachment) => (
                    <Box
                      key={attachment.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1,
                        bgcolor: 'white',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      {getFileIcon(attachment.type)}
                      <Typography variant="body2" sx={{ flex: 1, fontSize: 12 }}>
                        {attachment.name}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {formatFileSize(attachment.size)}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* File attachments preview */}
        {attachments.length > 0 && (
          <Box sx={{ borderTop: 1, borderColor: 'divider', p: 2 }}>
            {attachments.map((attachment) => (
              <Box
                key={attachment.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1,
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                {getFileIcon(attachment.type)}
                <Typography variant="body2" sx={{ flex: 1, fontSize: 13 }}>
                  {attachment.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.600' }}>
                  {formatFileSize(attachment.size)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => removeAttachment(attachment.id)}
                  sx={{ width: 24, height: 24 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, borderTop: 1, borderColor: 'divider' }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <IconButton
            type="button"
            onClick={() => fileInputRef.current?.click()}
            color="primary"
            sx={{ bgcolor: 'grey.100' }}
          >
            <AttachFileIcon fontSize="small" />
          </IconButton>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" color="primary">
                    <SendIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;