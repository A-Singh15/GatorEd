"use client"

import { useState, useEffect, useRef } from "react"
import { MessageType } from "@/app/_interfaces"
import GroqApi from "@/app/_lib/groq-api"
import { GATOR_SYSTEM_PROMPT } from "@/app/_lib/gator-prompt"
import { AdminSystem } from "@/app/_lib/admin-system"
import Header from "./Header"
import Message from "./Message"
import Compose from "./Compose"
import Footer from "./Footer"
import styles from "./styles.module.css"

interface ChatProps {
  groqAPI: GroqApi
  configuration: any
  isOpen: boolean
  onClose: () => void
}

export default function Chat({ groqAPI, configuration, isOpen, onClose }: ChatProps) {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const adminSystem = AdminSystem.getInstance()

  // Clear all stored data on component mount (every page refresh)
  useEffect(() => {
    // Clear chat history from localStorage
    localStorage.removeItem('gator-chat-history')
    
    // Clear any other stored data
    localStorage.removeItem('gator-has-interacted')
    localStorage.removeItem('gator-user-preferences')
    localStorage.removeItem('gator-session-data')
    
    // Clear sessionStorage as well
    sessionStorage.clear()
    
    // Start with empty messages array
    setMessages([])
    
    console.log('🐊 GatorEd: Fresh start - all stored data cleared!')
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmitUserMessage = async (message: string) => {
    if (!message.trim()) return

    // Check for admin superpower word
    if (adminSystem.checkAdminAccess(message)) {
      const adminMessage: MessageType = {
        id: Date.now().toString(),
        role: "assistant",
        content: adminSystem.getAdminPortalInfo(),
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, adminMessage])
      return
    }

    // Handle admin commands if in admin mode
    if (adminSystem.isAdmin()) {
      const adminResponse = adminSystem.handleAdminCommand(message);
      if (adminResponse) {
        const adminCommandMessage: MessageType = {
          id: Date.now().toString(),
          role: "assistant",
          content: adminResponse,
          timestamp: new Date().toISOString(),
        }
        setMessages(prev => [...prev, adminCommandMessage])
        return
      }
    }

    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await groqAPI.getAnswer({
        chat: [...messages, userMessage],
        systemPrompt: GATOR_SYSTEM_PROMPT
      })

      const assistantMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date().toISOString(),
        requestId: response.requestId,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting answer:", error)
      
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "🐊 Go Gators! I'm having trouble connecting right now. Please try again in a moment, or contact the Graduate Studies office directly at gradstudies@sfsu.edu or (415) 338-2234.",
        timestamp: new Date().toISOString(),
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleReaction = async (messageId: string, likeStatus: "good_answer" | "wrong_answer") => {
    const message = messages.find(m => m.id === messageId)
    if (message?.requestId) {
      try {
        await groqAPI.setReaction({
          requestId: message.requestId,
          likeStatus,
        })
      } catch (error) {
        console.error("Error setting reaction:", error)
      }
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.content}>
        <Header onClose={onClose} configuration={configuration} />
        
        <div className={styles.messagesContainer}>
          {messages.length === 0 && (
            <div className={styles.welcomeMessage}>
              <p>{configuration.welcomeMessage}</p>
            </div>
          )}
          
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              groqAPI={groqAPI}
              onReaction={handleReaction}
            />
          ))}
          
          {isLoading && (
            <div className={styles.loadingMessage}>
              <div className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>🐊 GatorEd is searching SFSU websites...</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <Compose onSubmit={handleSubmitUserMessage} isLoading={isLoading} />
        <Footer />
      </div>
    </div>
  )
}
