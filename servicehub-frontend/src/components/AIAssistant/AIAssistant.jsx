import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User, Home, ShoppingCart, Calendar, LogIn } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "👋 Hi! I'm your ServiceHub AI assistant. I can help you:\n\n🔍 Find services (salon, spa, plumbing, electrical)\n💰 Locate budget-friendly options\n📅 Book appointments\n🛒 Manage your cart\n👤 Navigate the website\n\nTry asking: 'Show me cheapest spa services' or 'How do I book an appointment?'",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced service data with more detailed information
  const serviceData = {
    'women salon': {
      route: '/subservices/Women Salon & Spa',
      categories: ['Packages', 'Blow-dry & style', 'Cut & style', 'Trim & style', 'Hair care', 'Keratin & botox', 'Hair extensions', 'Fashion color', 'Facials', 'Manicure & Pedicure', 'Spa Treatments', 'Bridal Makeup', 'Threading', 'Waxing'],
      cheapest: 'Basic haircut starts from ₹199, Threading from ₹49'
    },
    "men's salon": {
      route: '/subservices/Men\'s Salon & Spa',
      categories: ['Haircut', 'Beard Styling', 'Shave', 'Head Massage', 'Facial', 'Hair Color', 'Spa Treatments', 'Body Massage', 'D-Tan', 'Hair Wash', 'Manicure & Pedicure'],
      cheapest: 'Basic haircut starts from ₹149, Beard trim from ₹99'
    },
    'spa': {
      route: '/subservices/Women Salon & Spa',
      categories: ['Spa Treatments', 'Body Massage', 'Facials', 'Head Massage'],
      cheapest: 'Basic facial starts from ₹299, Head massage from ₹199'
    },
    'massage': {
      route: '/subservices/Women Salon & Spa',
      categories: ['Body Massage', 'Head Massage', 'Spa Treatments'],
      cheapest: 'Head massage from ₹199, Body massage from ₹499'
    },
    'plumbing': {
      route: '/subservices/Plumbing Services',
      categories: ['Bath fittings', 'Basin & sink', 'Grouting', 'Water filter', 'Drainage', 'Toilet', 'Tap & mixer', 'Water tank'],
      cheapest: 'Basic tap repair from ₹99, Drain unclogging from ₹149'
    },
    'electrical': {
      route: '/subservices/Electrical Services',
      categories: ['Wiring', 'Switch Installation', 'Fan Installation', 'Light Fitting', 'Inverter Installation', 'Electrical Repair', 'MCB & Fuse Repair', 'Geyser Installation', 'Door Bell Installation', 'Power Backup Solutions'],
      cheapest: 'Switch installation from ₹99, Light fitting from ₹149'
    },
    'ac': {
      route: '/subservices/AC Repair and Services',
      categories: ['AC Installation', 'AC Gas Filling', 'AC Servicing', 'AC Repair', 'AC Uninstallation', 'AC PCB Repair', 'AC Remote Repair', 'AC Cooling Issue', 'AC Water Leakage', 'AC Noise Issue'],
      cheapest: 'Basic AC servicing from ₹299, Gas filling from ₹1999'
    },
    'cleaning': {
      route: '/subservices/Cleaning Services',
      categories: ['Home Deep Cleaning', 'Sofa Cleaning', 'Carpet Cleaning', 'Kitchen Cleaning', 'Bathroom Cleaning', 'Office Cleaning', 'Mattress Cleaning', 'Window Cleaning', 'Water Tank Cleaning', 'Floor Scrubbing'],
      cheapest: 'Basic room cleaning from ₹199, Bathroom cleaning from ₹149'
    },
    'painting': {
      route: '/subservices/Painting Services',
      categories: ['Interior Painting', 'Exterior Painting', 'Wall Texturing', 'Color Consultation', 'Wallpaper Installation', 'Stencils & Designs', 'Ceiling Painting', 'Metal Painting', 'Wood Polishing', 'Touch-up & Patchwork'],
      cheapest: 'Wall touch-up from ₹299, Color consultation from ₹199'
    }
  };

  const processUserMessage = async (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return {
        text: "Hello! 👋 Welcome to ServiceHub! I'm here to help you find the perfect services. What can I assist you with today?"
      };
    }

    // Thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return {
        text: "You're welcome! 😊 Is there anything else I can help you with? I'm here to make your ServiceHub experience smooth and easy!"
      };
    }

    // Check for price/cheapest requests
    if (lowerMessage.includes('cheapest') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable') || lowerMessage.includes('budget') || lowerMessage.includes('price')) {
      // Check for specific services
      for (const [key, value] of Object.entries(serviceData)) {
        if (lowerMessage.includes(key)) {
          return {
            text: `💰 Great! Here are our most affordable ${key} options:\n\n${value.cheapest}\n\nWe have many budget-friendly packages available. Let me take you to see all ${key} services!`,
            action: () => navigate(value.route),
            actionText: `View ${key.charAt(0).toUpperCase() + key.slice(1)} Services`
          };
        }
      }
      
      // General cheapest services
      return {
        text: "💰 Looking for budget-friendly services? Here are our most affordable options:\n\n🪒 Men's haircut: ₹149\n💇‍♀️ Women's haircut: ₹199\n🔧 Basic repairs: ₹99\n🧽 Room cleaning: ₹199\n💆‍♀️ Head massage: ₹199\n\nWhich service interests you?",
        action: () => navigate('/'),
        actionText: "Browse All Services"
      };
    }

    // Check for specific service requests
    for (const [key, value] of Object.entries(serviceData)) {
      if (lowerMessage.includes(key)) {
        const topCategories = value.categories.slice(0, 4);
        return {
          text: `🎯 Perfect! I found ${key} services for you!\n\nPopular ${key} categories:\n${topCategories.map(cat => `• ${cat}`).join('\n')}\n\nLet me take you to explore all ${key} options!`,
          action: () => navigate(value.route),
          actionText: `View ${key.charAt(0).toUpperCase() + key.slice(1)} Services`
        };
      }
    }

    // Booking and appointment requests
    if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule') || lowerMessage.includes('order')) {
      return {
        text: "📅 Easy! Here's how to book on ServiceHub:\n\n1️⃣ Browse services and select what you need\n2️⃣ Add services to your cart\n3️⃣ Go to checkout\n4️⃣ Choose your preferred time slot\n5️⃣ Select payment method (COD/UPI/GPay)\n6️⃣ Confirm your booking!\n\nShall I take you to browse services?",
        action: () => navigate('/'),
        actionText: "Browse Services"
      };
    }

    // Navigation requests
    if (lowerMessage.includes('cart') || lowerMessage.includes('checkout')) {
      return {
        text: "🛒 Taking you to your cart where you can review selected services and proceed to checkout!",
        action: () => navigate('/cart'),
        actionText: "Go to Cart"
      };
    }

    if (lowerMessage.includes('home') || lowerMessage.includes('main page')) {
      return {
        text: "🏠 Taking you to our homepage where you can explore all ServiceHub services!",
        action: () => navigate('/'),
        actionText: "Go to Home"
      };
    }

    if (lowerMessage.includes('login') || lowerMessage.includes('sign in') || lowerMessage.includes('account') || lowerMessage.includes('register')) {
      return {
        text: "👤 I'll redirect you to the login page. You can sign in to your existing account or create a new one to track your bookings!",
        action: () => navigate('/login'),
        actionText: "Go to Login"
      };
    }

    if (lowerMessage.includes('booking') || lowerMessage.includes('my orders') || lowerMessage.includes('history') || lowerMessage.includes('track')) {
      return {
        text: "📋 Let me take you to your bookings page where you can view your order history and track current bookings!",
        action: () => navigate('/booking'),
        actionText: "View My Bookings"
      };
    }

    // Location and availability
    if (lowerMessage.includes('location') || lowerMessage.includes('area') || lowerMessage.includes('city') || lowerMessage.includes('available')) {
      return {
        text: "📍 ServiceHub operates across multiple cities in India! You can check service availability by:\n\n• Selecting your location from the navbar\n• The system will show available services in your area\n• Different cities may have varying service options\n\nSelect your location to get started!"
      };
    }

    // Help and general inquiries
    if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what can you do')) {
      return {
        text: "🤝 I'm your personal ServiceHub assistant! I can help with:\n\n� Finding specific services\n💰 Locating budget-friendly options\n📱 Navigating the website\n📅 Booking appointments\n🛒 Managing your cart\n� Service recommendations\n📞 General inquiries\n\nJust ask me anything!"
      };
    }

    // Payment information
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('cash') || lowerMessage.includes('upi') || lowerMessage.includes('gpay')) {
      return {
        text: "💳 ServiceHub accepts multiple payment methods:\n\n💵 Cash on Delivery (COD)\n📱 UPI Payment\n📱 Google Pay (GPay)\n\nChoose your preferred payment method during checkout. All transactions are secure!"
      };
    }

    // Contact and support
    if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      return {
        text: "📞 Need direct support? You can:\n\n• Use this AI assistant for instant help\n• Check the About page for more information\n• Contact information is available in the footer\n• We're here to help with any questions!\n\nWhat specific help do you need?"
      };
    }

    // About ServiceHub
    if (lowerMessage.includes('about') || lowerMessage.includes('what is servicehub') || lowerMessage.includes('company')) {
      return {
        text: "🏢 ServiceHub is your one-stop platform for home and personal services!\n\nWe offer:\n🏠 Home services (plumbing, electrical, cleaning)\n💅 Beauty services (salon, spa)\n🔧 Appliance repair\n🎨 Painting services\n\nBooking is easy, reliable professionals, transparent pricing!",
        action: () => navigate('/about'),
        actionText: "Learn More"
      };
    }

    // Emergency/urgent requests
    if (lowerMessage.includes('urgent') || lowerMessage.includes('emergency') || lowerMessage.includes('asap') || lowerMessage.includes('immediate')) {
      return {
        text: "⚡ Need urgent service? Many of our professionals offer same-day or next-day service! \n\n• Check available time slots during booking\n• Contact service providers directly after booking\n• Use our priority booking for urgent needs\n\nWhat urgent service do you need?",
        action: () => navigate('/'),
        actionText: "Find Urgent Services"
      };
    }

    // Default response with current page context
    const currentPage = location.pathname;
    let contextualText = "";
    
    if (currentPage === '/') {
      contextualText = "I see you're on our homepage! ";
    } else if (currentPage.includes('/subservices/')) {
      const service = currentPage.split('/subservices/')[1];
      contextualText = `I see you're browsing ${decodeURIComponent(service)} services! `;
    } else if (currentPage === '/cart') {
      contextualText = "I see you're viewing your cart! ";
    } else if (currentPage === '/login') {
      contextualText = "I see you're on the login page! ";
    }

    return {
      text: `${contextualText}I'm here to help! 😊\n\nYou can ask me about:\n• 🔍 "Show me salon services"\n• 💰 "What are your cheapest options?"\n• 📅 "How do I book an appointment?"\n• 🛒 "Take me to my cart"\n• 🏠 "Go to homepage"\n\nWhat would you like to know?`
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(async () => {
      const response = await processUserMessage(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.text,
        timestamp: new Date(),
        action: response.action,
        actionText: response.actionText
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 500); // Randomized response time
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Enhanced quick actions based on current page
  const getQuickActions = () => {
    const currentPage = location.pathname;
    
    if (currentPage === '/') {
      return [
        { text: "Cheapest spa services", message: "Show me the cheapest spa services" },
        { text: "Book appointment", message: "How do I book an appointment?" },
        { text: "Men's salon", message: "Show me men's salon services" },
        { text: "Plumbing services", message: "I need plumbing services" }
      ];
    } else if (currentPage.includes('/subservices/')) {
      return [
        { text: "Cheapest options", message: "What are the cheapest options here?" },
        { text: "How to book", message: "How do I book these services?" },
        { text: "Go to cart", message: "Take me to my cart" },
        { text: "Other services", message: "Show me other services" }
      ];
    } else if (currentPage === '/cart') {
      return [
        { text: "How to checkout", message: "How do I proceed to checkout?" },
        { text: "Add more services", message: "I want to add more services" },
        { text: "Payment options", message: "What payment options do you have?" },
        { text: "Booking help", message: "Help me complete my booking" }
      ];
    } else {
      return [
        { text: "Go to home", message: "Take me to homepage" },
        { text: "Browse services", message: "Show me all services" },
        { text: "My bookings", message: "Show me my bookings" },
        { text: "Help", message: "I need help" }
      ];
    }
  };

  return (
    <>
      {/* AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-[#1f4959] to-[#5c7c89] hover:from-[#5c7c89] hover:to-[#1f4959] text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#5c7c89]/50 animate-pulse"
          aria-label="AI Assistant"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          {/* Notification dot for first-time users */}
          {messages.length === 1 && !isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          )}
        </button>
      </div>

      {/* AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border-2 border-[#5c7c89] z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1f4959] to-[#5c7c89] text-white p-4 flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2 animate-bounce">
              <Bot size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">ServiceHub AI</h3>
              <p className="text-sm opacity-90">Your personal service assistant</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/')}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title="Go to Home"
              >
                <Home size={16} />
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                title="Go to Cart"
              >
                <ShoppingCart size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#e6f2f1]/30 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-[#5c7c89] text-white' 
                      : 'bg-[#1f4959] text-white'
                  }`}>
                    {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`rounded-2xl p-3 ${
                    message.type === 'user'
                      ? 'bg-[#5c7c89] text-white'
                      : 'bg-white border border-[#5c7c89]/20 text-[#1f4959] shadow-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    {message.action && (
                      <button
                        onClick={message.action}
                        className="mt-3 bg-[#1f4959] hover:bg-[#5c7c89] text-white px-4 py-2 rounded-lg text-xs transition-all duration-200 hover:shadow-md"
                      >
                        {message.actionText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-[#1f4959] text-white flex items-center justify-center flex-shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white border border-[#5c7c89]/20 text-[#1f4959] rounded-2xl p-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#5c7c89] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#5c7c89] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-[#5c7c89] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="p-4 border-t border-[#5c7c89]/20 bg-gradient-to-r from-[#e6f2f1]/20 to-white">
              <p className="text-xs text-[#5c7c89] mb-2 font-medium">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {getQuickActions().map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(action.message)}
                    className="text-xs bg-[#e6f2f1] hover:bg-[#5c7c89]/10 text-[#1f4959] px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-sm border border-[#5c7c89]/10"
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-[#5c7c89]/20 bg-white">
            <div className="flex gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about ServiceHub..."
                className="flex-1 resize-none border border-[#5c7c89]/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c7c89] focus:border-transparent transition-all duration-200"
                rows="1"
                style={{ maxHeight: '100px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-[#1f4959] hover:bg-[#5c7c89] disabled:bg-gray-300 text-white rounded-xl p-2 transition-colors duration-200 flex-shrink-0 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Press Enter to send • Powered by ServiceHub AI</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
