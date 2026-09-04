import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Phone, CheckCircle2, Bot, ShieldCheck, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { safeStorage } from '../utils/storage';

interface LiveChatWidgetProps {
  primaryColor?: string;
  accentColor?: string;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  primaryColor = '#08192E',
  accentColor = '#D97706',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [visitorName, setVisitorName] = useState(() => {
    return safeStorage.getItem('cpt_visitor_name') || '';
  });
  const [visitorPhone, setVisitorPhone] = useState(() => {
    return safeStorage.getItem('cpt_visitor_phone') || '';
  });
  const [isSending, setIsSending] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showIdentityForm, setShowIdentityForm] = useState(!visitorName);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages from server API
  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/chat/messages');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.messages)) {
          setMessages(json.messages);
        }
      }
    } catch (e) {
      console.warn('Chat offline fallback mode');
    }
  };

  useEffect(() => {
    fetchMessages();
    // Poll every 4 seconds when chat is active
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasUnread(false);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (!visitorName.trim()) {
      setShowIdentityForm(true);
      return;
    }

    setIsSending(true);
    const newMsg: Partial<ChatMessage> = {
      sender: 'visitor',
      name: visitorName.trim() || 'Visitor',
      phone: visitorPhone.trim(),
      message: inputText.trim(),
    };

    // Save visitor details locally
    safeStorage.setItem('cpt_visitor_name', visitorName);
    if (visitorPhone) {
      safeStorage.setItem('cpt_visitor_phone', visitorPhone);
    }

    try {
      const res = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.message) {
          setMessages(prev => [...prev, data.message]);
          setInputText('');
        }
      } else {
        // Fallback local append
        const localMsg: ChatMessage = {
          id: `local_${Date.now()}`,
          sender: 'visitor',
          name: visitorName || 'Visitor',
          phone: visitorPhone,
          message: inputText.trim(),
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, localMsg]);
        setInputText('');
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans select-none">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Live Chat"
            className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-700 to-indigo-900 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-200 border border-blue-400/40 cursor-pointer"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-950 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-indigo-950" />
            </div>
            <div className="text-left pr-1">
              <div className="text-xs font-bold font-['Outfit'] tracking-wide leading-tight">Live Chat Desk</div>
              <div className="text-[10px] text-emerald-300 font-medium leading-none mt-0.5">Online Support</div>
            </div>
          </button>
        </div>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] bg-[#0A1526] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#08192E] via-[#0B213F] to-[#122B54] p-4 border-b border-slate-700/70 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold font-['Outfit'] border border-blue-400">
                  ⚡
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#08192E]" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-['Outfit'] leading-tight">CAN STAR Engineering Desk</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Real-time Live Chat Active</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Subheader Notice */}
          <div className="bg-blue-950/60 border-b border-blue-900/60 px-3 py-1.5 text-[11px] text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1 text-sky-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Hotline: 01300-746860</span>
            </span>
            <span className="text-[10px] text-amber-400 font-medium">TEKSAN Power BD</span>
          </div>

          {/* Identity Form Prompt (if visitor hasn't introduced) */}
          {showIdentityForm && (
            <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-bold text-amber-400 flex items-center justify-between">
                <span>Please introduce yourself:</span>
                {visitorName && (
                  <button
                    onClick={() => setShowIdentityForm(false)}
                    className="text-[10px] text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name / Org"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="bg-[#081220] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Phone / WhatsApp"
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  className="bg-[#081220] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Message History */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-4 space-y-2">
                <Bot className="w-8 h-8 text-blue-400 opacity-60" />
                <p className="text-xs">No messages yet. Send an inquiry regarding generator pricing, capacity sizing, or technical specs!</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isAdmin = msg.sender === 'admin';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAdmin ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
                      <span className="font-semibold text-slate-300">
                        {isAdmin ? 'CAN STAR Admin' : (msg.name || 'You')}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2 leading-relaxed shadow ${
                        isAdmin
                          ? 'bg-[#13233F] text-slate-100 border border-blue-900/60 rounded-tl-none'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-1.5 bg-[#070F1B] border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[10px] text-slate-400">
            <button
              onClick={() => setInputText('What is the price for a 500 kVA Perkins generator?')}
              className="px-2 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer transition border border-slate-700/60"
            >
              ⚡ 500 kVA Price
            </button>
            <button
              onClick={() => setInputText('Do you have Tier III Data Center compliance certificates?')}
              className="px-2 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer transition border border-slate-700/60"
            >
              🏢 Tier III Spec
            </button>
            <button
              onClick={() => setInputText('I need urgent emergency service / breakdown dispatch.')}
              className="px-2 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 whitespace-nowrap cursor-pointer transition border border-slate-700/60"
            >
              🚨 Emergency Service
            </button>
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-[#081220] border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={visitorName ? "Type your message..." : "Introduce yourself & message..."}
              className="flex-1 bg-[#0F1E36] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isSending || !inputText.trim()}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg transition font-bold text-xs flex items-center gap-1 shadow cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
