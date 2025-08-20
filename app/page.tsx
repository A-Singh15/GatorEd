"use client"

import { useState, useEffect } from "react"
import GroqApi from "@/app/_lib/groq-api"
import { defaultConfiguration, defaultGroqConfiguration } from "./configuration"
import PopupButton from "./_components/PopupButton"
import Chat from "./_components/Chat"

export default function Home() {
  const [groqAPI] = useState(() => new GroqApi({ groqConfiguration: defaultGroqConfiguration }))
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [configuration] = useState(defaultConfiguration)

  // Clear all stored data on page load/refresh
  useEffect(() => {
    // Clear all localStorage data
    const keysToRemove = [
      'gator-chat-history',
      'gator-has-interacted', 
      'gator-user-preferences',
      'gator-session-data',
      'gator-chat-state',
      'gator-messages',
      'gator-configuration'
    ]
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
    })
    
    // Clear sessionStorage completely
    sessionStorage.clear()
    
    // Reset chat state
    setIsChatOpen(false)
    
    console.log('🐊 GatorEd Page: Fresh start - all stored data cleared!')
  }, [])

  const handleToggleChat = () => {
    console.log('🐊 GatorEd Page: Toggle chat, current state:', isChatOpen)
    setIsChatOpen(!isChatOpen)
  }

  const handleCloseChat = () => {
    console.log('🐊 GatorEd Page: Close chat')
    setIsChatOpen(false)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sfsu-heading text-gray-900 mb-4">
            🐊 GatorEd - SFSU Graduate Studies Assistant
          </h1>
          <p className="text-xl sfsu-body text-gray-600 mb-4">
            Your friendly algorithm for natural language processing assistant for San Francisco State University Graduate Studies
          </p>
          
          {/* Credits Section - Top */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              Built and developed by <span className="font-semibold text-purple-600">Aaron</span> and <span className="font-semibold text-purple-600">Kashaf</span>
            </p>
            <p className="text-sm text-gray-500">
              Mentored by <span className="font-semibold text-purple-600">Katrina</span> - Graduate Studies
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-2xl sfsu-subheading text-gray-800 mb-4">
              Welcome to GatorEd! 🐊
            </h2>
            
            <p className="text-gray-700 mb-6 sfsu-body">
              I'm your dedicated algorithm for natural language processing assistant for SFSU Graduate Studies. I can help you with:
            </p>
            
            <ul className="space-y-2 text-gray-700 mb-6 sfsu-body">
              <li>📅 <strong>Academic dates and deadlines</strong> - Current calendar information</li>
              <li>🎓 <strong>Graduate admissions & advising</strong> - Application processes and requirements</li>
              <li>📋 <strong>Transcript ordering</strong> - How to request official transcripts</li>
              <li>📞 <strong>Contact information</strong> - Office locations, phone numbers, and email addresses</li>
              <li>📚 <strong>Course planning</strong> - Direct you to the right advisors and coordinators</li>
            </ul>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                🆕 Fresh Start Every Time!
              </h3>
              <p className="text-green-700">
                Every time you refresh this page, GatorEd starts fresh with no saved data. 
                This ensures you always get the most current information from SFSU websites.
              </p>
            </div>
            
            <p className="text-gray-700">
              Click the chat button in the bottom right corner to start asking questions! 
              I'll search SFSU's official websites in real-time to provide you with accurate, 
              up-to-date information using advanced natural language processing algorithms.
            </p>
          </div>
        </div>
      </div>
      
      {/* Chat Popup Button */}
      <PopupButton
        groqAPI={groqAPI}
        configuration={configuration}
        onToggle={handleToggleChat}
        isOpen={isChatOpen}
      />
      
      {/* Chat Window */}
      <Chat
        groqAPI={groqAPI}
        configuration={configuration}
        isOpen={isChatOpen}
        onClose={handleCloseChat}
      />
    </main>
  )
}
