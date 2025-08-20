import styles from "./styles.module.css"

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <span style={{ fontSize: "12px", color: "#666" }}>
          🐊 Powered by GatorEd - SFSU Graduate Studies Assistant
        </span>
      </div>
    </div>
  )
}
