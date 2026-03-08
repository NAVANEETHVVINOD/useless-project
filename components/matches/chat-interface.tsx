"use client"

import { useState, useEffect, useRef } from "react"
import { Pet, Message } from "@prisma/client"
import { sendMessage } from "@/app/actions/chat"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface ChatInterfaceProps {
  matchId: string
  currentUserId: string
  otherPet: Pet
  initialMessages: Message[]
}

export function ChatInterface({ matchId, currentUserId, otherPet, initialMessages }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputText, setInputText] = useState("")
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // 1. Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 2. Realtime Subscription
  useEffect(() => {
    // We subscribe to the 'Message' table where matchId = ours
    const channel = supabase
      .channel(`match_room_${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Message',
          filter: `matchId=eq.${matchId}`
        },
        (payload: any) => {
          const newMessage = payload.new as Message
          
          // Verify it's not our own message if we're aggressively updating UI
          // (Though here we just append it safely to avoid local duplicate bugs)
          setMessages((prev) => {
            if (prev.find(m => m.id === newMessage.id)) return prev
            return [...prev, newMessage]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [matchId, supabase])

  // 3. Send Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || isSending) return

    const textPayload = inputText.trim()
    setInputText("") // Optimistic UI clear
    setIsSending(true)

    // Optional: Optimistic UI insertion can go here
    // We rely on the Supabase Realtime trigger to mirror the true DB state back to us

    const result = await sendMessage(matchId, textPayload)
    if (result.error) {
      console.error(result.error)
      // If error, put the text back
      setInputText(textPayload)
    }

    setIsSending(false)
  }

  return (
    <div className="flex flex-col h-full bg-background relative max-w-screen-md w-full mx-auto shadow-xl border-x">
      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b bg-card sticky top-0 z-10 shrink-0">
        <Link href="/matches" className="mr-3 p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border bg-muted overflow-hidden shrink-0">
            <img 
              src={(otherPet.photos as string[])[0] || '/landing/avatars/dog-1.jpg'} 
              alt={otherPet.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-base leading-tight">{otherPet.name}</h2>
            <p className="text-xs text-muted-foreground leading-tight">{otherPet.breed}</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-50 text-center">
            <div className="text-4xl mb-2">👋</div>
            <p className="text-sm font-medium">Be the first to say hi to {otherPet.name}!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUserId
            return (
              <div 
                key={msg.id} 
                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[75%] px-4 py-2.5 rounded-2xl text-sm
                    ${isMe 
                      ? 'bg-primary text-white rounded-tr-sm shadow-md shadow-primary/20' 
                      : 'bg-muted text-foreground rounded-tl-sm border border-border shadow-sm'
                    }
                  `}
                >
                  <p className="break-words">{msg.content}</p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} className="h-1 animate-pulse" />
      </div>

      {/* Message Input Bottom Bar */}
      <div className="p-4 border-t bg-card shrink-0">
        <form 
          onSubmit={handleSendMessage}
          className="flex items-center gap-2"
        >
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${otherPet.name}...`}
            className="flex-1 h-12 bg-muted rounded-full px-5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/20"
            disabled={isSending}
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || isSending}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 shadow-md shadow-primary/20"
          >
            {isSending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5 translate-x-px translate-y-px" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
