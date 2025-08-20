import styles from "./styles.module.css"
import { Configuration } from "@/app/_interfaces"
import { AdminSystem } from "@/app/_lib/admin-system"

export default function Header({
  configuration,
  onClose,
}: {
  configuration: Configuration
  onClose: () => void
}) {
  const adminSystem = AdminSystem.getInstance()
  const isAdmin = adminSystem.isAdmin()

  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        <span style={{ fontSize: "28px", marginRight: "12px" }}>
          🐊
        </span>
        {configuration.windowHeading}
        {isAdmin && (
          <span style={{ 
            fontSize: "12px", 
            marginLeft: "8px", 
            background: "#DCAE27", 
            color: "#442C8B", 
            padding: "2px 6px", 
            borderRadius: "4px",
            fontWeight: "bold"
          }}>
            ADMIN
          </span>
        )}
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.smallBtn}
          onClick={onClose}
          aria-label="Close chat"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className={styles.tooltip}>Close</div>
        </button>
      </div>
    </div>
  )
}
