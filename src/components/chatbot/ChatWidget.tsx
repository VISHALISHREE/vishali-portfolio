import { AnimatePresence, motion } from 'framer-motion'
import { Bot, MessageCircle, Send, User, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getAnswer, suggestedQuestions, welcomeMessage } from '../../lib/chatbot'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

let messageCounter = 0
function nextId() {
  messageCounter += 1
  return `msg-${messageCounter}`
}

export function ChatWidget() {
  const reduced = useReducedMotion()
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: nextId(), role: 'assistant', text: welcomeMessage },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, typing])

  const respond = (question: string) => {
    setTyping(true)
    const delay = 500 + Math.random() * 500
    window.setTimeout(() => {
      const answer = getAnswer(question)
      setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', text: answer }])
      setTyping(false)
    }, delay)
  }

  const handleSend = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: trimmed }])
    setInput('')
    respond(trimmed)
  }

  const handleSuggested = (label: string, answer: () => string) => {
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: label }])
    setTyping(true)
    const delay = 400 + Math.random() * 400
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', text: answer() }])
      setTyping(false)
    }, delay)
  }

  const showSuggestions = messages.length === 1

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Portfolio Assistant chat window"
            initial={reduced ? undefined : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass mb-4 flex h-[70vh] max-h-[560px] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl"
          >
            <header className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet text-white">
                  <Bot size={18} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-white">Portfolio Assistant</p>
                  <p className="text-xs text-white/45">Ask me anything about Vishali</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft"
              >
                <X size={16} />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      m.role === 'user' ? 'bg-white/10 text-white/70' : 'bg-gradient-to-br from-electric to-violet text-white'
                    }`}
                  >
                    {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </span>
                  <p
                    className={`whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-electric to-violet text-white'
                        : 'bg-white/[0.06] text-white/80'
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              {typing && (
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet text-white">
                    <Bot size={12} />
                  </span>
                  <span className="flex items-center gap-1 rounded-2xl bg-white/[0.06] px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-white/60" />
                    <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-white/60 [animation-delay:0.15s]" />
                    <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-white/60 [animation-delay:0.3s]" />
                  </span>
                </div>
              )}

              {showSuggestions && !typing && (
                <div className="flex flex-col gap-2 pt-1">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => handleSuggested(q.label, q.answer)}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-left text-xs text-white/70 transition-colors hover:border-violet/40 hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend(input)
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <label htmlFor={`${panelId}-input`} className="sr-only">
                Message the Portfolio Assistant
              </label>
              <input
                id={`${panelId}-input`}
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend(input)
                  }
                }}
                placeholder="Ask about skills, projects, experience..."
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-violet/50"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-electric to-violet text-white transition-opacity disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close Portfolio Assistant chat' : 'Open Portfolio Assistant chat'}
        aria-expanded={open}
        aria-controls={panelId}
        whileHover={reduced ? undefined : { scale: 1.06 }}
        whileTap={reduced ? undefined : { scale: 0.95 }}
        className="glow-border ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <span className={!reduced && !open ? 'animate-pulse-glow' : ''}>
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </span>
      </motion.button>
    </div>
  )
}
