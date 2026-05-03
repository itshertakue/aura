'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([
    { role: 'assistant', content: "Hello Takunda! I'm your Climate Copilot. Ask me anything about your carbon footprint or tax savings." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, data]);
    } catch (err) {
      console.error('Failed to chat');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={styles.chatPage}>
      <header className={styles.header}>
        <h2 className="h1">Climate Copilot</h2>
        <p className={styles.subtitle}>Autonomous intelligence for supply chain and tax optimization.</p>
      </header>

      <div className={`${styles.chatContainer} glass`}>
        <div className={styles.messages} ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={styles.message} data-role={msg.role}>
              {msg.role === 'assistant' && <div className={styles.avatar}>🤖</div>}
              <div className={styles.bubble}>
                {msg.content}
                {msg.stats && (
                  <div className={styles.statsList}>
                    {msg.stats.map((s: any) => (
                      <div key={s.label} className={styles.statItem}>
                        <span>{s.label}:</span>
                        <strong>{s.value}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && <div className={styles.typingIndicator}>Copilot is thinking...</div>}
        </div>

        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              placeholder="Ask me how to save carbon taxes..." 
              className={styles.chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className={styles.sendBtn} onClick={handleSend} disabled={isTyping}>
              {isTyping ? '...' : '🚀'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
