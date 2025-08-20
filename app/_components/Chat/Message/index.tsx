import ReactionButton from "./ReactionButton"
import styles from "./styles.module.css"
import { MessageType } from "@/app/_interfaces"
import GroqApi from "@/app/_lib/groq-api"
import { marked } from "marked"
import { useEffect, useState } from "react"
import { splitMessage } from "@/app/_lib/message-splitter"

export default function Message({
  message,
  groqAPI,
  onReaction,
}: {
  message: MessageType
  groqAPI: GroqApi
  onReaction: (messageId: string, likeStatus: "good_answer" | "wrong_answer") => void
}) {
  const [currentReaction, setCurrentReaction] = useState<"good_answer" | "wrong_answer" | null>(null)
  const messageParts = splitMessage(message.content)

  function handleReaction(reaction: "good_answer" | "wrong_answer"): void {
    setCurrentReaction(reaction)
    if (message.id) {
      onReaction(message.id, reaction)
    }
  }

  useEffect(() => {
    const tokenizer = new marked.Tokenizer()
    const renderer = new marked.Renderer()
    tokenizer.lheading = (_src) => undefined
    renderer.link = (href, _title, text) => `<a target="_blank" href="${href}" style="color: #006633; text-decoration: underline;">${text}</a>`

    marked.setOptions({
      tokenizer: tokenizer,
      renderer: renderer,
    })
  }, [])

  return (
    <div
      className={styles.messageContainer}
      style={{
        justifyContent: message.role === "assistant" ? "flex-start" : "flex-end",
      }}
    >
      {messageParts.map((part, index) => (
        <div
          key={index}
          className={`${styles.message} ${message.role !== "assistant" ? styles.userMessage : ""}`}
          style={
            message.role !== "assistant" ? { backgroundColor: "#442C8B", cursor: "default", color: "white" } : {}
          }
        >
          <div dangerouslySetInnerHTML={{ __html: marked(part) }} />
          {/* Only show reaction buttons on the last message part */}
          {message.role === "assistant" && index === messageParts.length - 1 && (
            <>
              {currentReaction === null ? (
                <div className={styles.messageRating}>
                  <ReactionButton 
                    reaction="LIKE" 
                    hoverColor="#006633" 
                    onButtonClick={() => handleReaction("good_answer")} 
                  />
                  <ReactionButton 
                    reaction="DISLIKE" 
                    hoverColor="#006633" 
                    onButtonClick={() => handleReaction("wrong_answer")} 
                  />
                </div>
              ) : (
                <div className={styles.messageFeedbackThanks}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#006633" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Thanks for submitting your feedback!
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
