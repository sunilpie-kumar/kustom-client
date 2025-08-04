import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Badge,
  Button,
  TextField,
  IconButton,
  Divider,
  InputAdornment,
} from '@mui/material';
import PaperclipIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';

const conversationsData = [
  {
    id: 1,
    provider: 'Sarah Johnson',
    service: 'Interior Design',
    lastMessage: 'I\'ve prepared some initial sketches for your living room. Would you like to schedule a call to discuss them?',
    timestamp: '2 hours ago',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6be4d1e?auto=format&fit=crop&w=50&q=80'
  },
  {
    id: 2,
    provider: 'Mike Wilson',
    service: 'Custom Gifts',
    lastMessage: 'Perfect! I\'ll start working on the personalized photo album. Expected completion is next week.',
    timestamp: '1 day ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80'
  },
  {
    id: 3,
    provider: 'AutoCustom Pro',
    service: 'Car Modification',
    lastMessage: 'We have all the parts ready for your car modification. When would be a good time to bring your vehicle in?',
    timestamp: '2 days ago',
    unread: 1,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80'
  },
  {
    id: 4,
    provider: 'Anita Reddy',
    service: 'Business Consulting',
    lastMessage: 'Thank you for the productive session today. I\'ve sent over the action items we discussed.',
    timestamp: '3 days ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=50&q=80'
  }
];

const currentConversation = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    message: 'Hi John! I hope you\'re doing well. I wanted to follow up on our interior design consultation.',
    timestamp: '10:30 AM',
    isProvider: true
  },
  {
    id: 2,
    sender: 'You',
    message: 'Hi Sarah! Yes, I\'m excited to see what ideas you have for the living room.',
    timestamp: '10:32 AM',
    isProvider: false
  },
  {
    id: 3,
    sender: 'Sarah Johnson',
    message: 'Great! I\'ve been working on some concepts based on your preferences. I have a modern minimalist approach and a cozy traditional style option.',
    timestamp: '10:35 AM',
    isProvider: true
  },
  {
    id: 4,
    sender: 'Sarah Johnson',
    message: 'I\'ve prepared some initial sketches for your living room. Would you like to schedule a call to discuss them?',
    timestamp: '10:37 AM',
    isProvider: true
  }
];

const MessagesPage = ({ onBack }) => {
  const [selectedConversation, setSelectedConversation] = useState(conversationsData[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 50%, #E0E7FF 100%)',
      py: 8,
    }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 8 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}>
          <Box>
            <Typography variant="h3" fontWeight="bold" color="text.primary">Messages</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>Chat with your service providers</Typography>
          </Box>
          <Button onClick={onBack} variant="outlined">
            Back to Dashboard
          </Button>
        </Box>

        <Grid container spacing={6} sx={{ height: { lg: 600 } }}>
          {/* Conversations List */}
          <Grid item xs={12} lg={4}>
            <Card elevation={3} sx={{ border: 0, boxShadow: 4, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)' }}>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MessageIcon sx={{ fontSize: 20 }} />
                    <Typography fontWeight="bold">Conversations</Typography>
                  </Box>
                }
                sx={{ pb: 2 }}
              />
              <CardContent sx={{ pt: 0 }}>
                <TextField
                  placeholder="Search conversations..."
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'grey.500' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <Divider sx={{ mb: 2 }} />
                <Box>
                  {conversationsData.map((conversation) => (
                    <Box
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        bgcolor: selectedConversation.id === conversation.id ? 'blue.50' : 'transparent',
                        borderRight: selectedConversation.id === conversation.id ? '4px solid #2563EB' : 'none',
                        transition: 'background 0.2s',
                        '&:hover': { bgcolor: 'grey.100' },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={conversation.avatar} alt={conversation.provider} sx={{ width: 40, height: 40 }} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography fontWeight="bold" noWrap>{conversation.provider}</Typography>
                            {conversation.unread > 0 && (
                              <Badge color="primary" badgeContent={conversation.unread} />
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary" noWrap>{conversation.service}</Typography>
                          <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.5 }}>{conversation.lastMessage}</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>{conversation.timestamp}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Chat Area */}
          <Grid item xs={12} lg={8}>
            <Card elevation={3} sx={{ border: 0, boxShadow: 4, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                sx={{ pb: 2, borderBottom: '1px solid #E5E7EB' }}
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={selectedConversation.avatar} alt={selectedConversation.provider} sx={{ width: 40, height: 40 }} />
                    <Box>
                      <Typography fontWeight="bold">{selectedConversation.provider}</Typography>
                      <Typography variant="body2" color="text.secondary">{selectedConversation.service}</Typography>
                    </Box>
                  </Box>
                }
              />
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                {/* Messages */}
                <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
                  {currentConversation.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.isProvider ? 'flex-start' : 'flex-end',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: { xs: '80%', lg: '60%' },
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          bgcolor: message.isProvider ? 'grey.100' : 'primary.main',
                          color: message.isProvider ? 'text.primary' : '#fff',
                        }}
                      >
                        <Typography variant="body2">{message.message}</Typography>
                        <Typography variant="caption" sx={{ mt: 0.5, color: message.isProvider ? 'grey.600' : 'primary.contrastText' }}>
                          {message.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Message Input */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, borderTop: '1px solid #E5E7EB', pt: 2 }}>
                  <IconButton color="primary">
                    <PaperclipIcon fontSize="small" />
                  </IconButton>
                  <TextField
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    fullWidth
                    size="small"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <IconButton color="primary" onClick={handleSendMessage}>
                    <SendIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MessagesPage;