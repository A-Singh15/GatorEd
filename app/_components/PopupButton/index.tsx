"use client"

import { useState, useEffect } from "react"
import GroqApi from "@/app/_lib/groq-api"
import styles from "./styles.module.css"

interface PopupButtonProps {
  groqAPI: GroqApi
  configuration: any
  onToggle: () => void
  isOpen: boolean
}

export default function PopupButton({ groqAPI, configuration, onToggle, isOpen }: PopupButtonProps) {
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showUnreadDot, setShowUnreadDot] = useState(false)

  // Clear all stored data on component mount (every page refresh)
  useEffect(() => {
    // Clear all stored data
    localStorage.removeItem('gator-has-interacted')
    localStorage.removeItem('gator-chat-history')
    localStorage.removeItem('gator-user-preferences')
    localStorage.removeItem('gator-session-data')
    
    // Clear sessionStorage as well
    sessionStorage.clear()
    
    // Reset state to fresh start
    setHasInteracted(false)
    setShowUnreadDot(false)
    
    console.log('🐊 GatorEd Popup: Fresh start - all stored data cleared!')
    console.log('🐊 GatorEd Popup: Configuration:', configuration)
  }, [])

  const handleClick = () => {
    console.log('🐊 GatorEd Popup: Button clicked!')
    if (!hasInteracted) {
      setHasInteracted(true)
      groqAPI.logEvent({
        eventType: "POPUP_CLICKED",
        eventContext: { isFirstInteraction: true }
      })
    }
    
    setShowUnreadDot(false)
    onToggle()
  }

  return (
    <div className={styles.popupButtonContainer} style={{ zIndex: 9999 }}>
      <button
        className={styles.popupButton}
        onClick={handleClick}
        aria-label="Chat with GatorEd"
        style={{
          backgroundColor: `#${configuration.color}`,
          borderColor: `#${configuration.color}`,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: '2px solid',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 10000,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className={styles.fadingImage}>
          <img
            src={configuration.popupIcon}
            alt="GatorEd"
            width="32"
            height="32"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
        
        {showUnreadDot && (
          <div className={styles.unreadDot} />
        )}
      </button>
      
      {!isOpen && (
        <div className={styles.popupWidget}>
          <div dangerouslySetInnerHTML={{ __html: configuration.popupMessage }} />
        </div>
      )}
    </div>
  )
}
