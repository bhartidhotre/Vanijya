import "../styles/NotificationPanel.css";

export default function NotificationPanel({ isOpen, onClose, notifications }) {
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );



  return (
    <div className={`notification-sidebar ${isOpen ? "open" : ""}`}>
      {/* Overlay */}
      <div className="notification-overlay" onClick={onClose}></div>

      {/* Sidebar Content */}
      <div className="notification-panel-content">
        <div className="notification-header">
          <h2>Notifications</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="notification-body">
          {sortedNotifications.length === 0 ? (
            <p className="no-msg">No new messages</p>
          ) : (
            sortedNotifications.map((msg, i) => (
              <div
                key={i}
                className={`notification-item ${msg.isRead ? "read" : "unread"}`}
onClick={() => window.location.href = `/chat/${msg.productId}?chatId=${msg.chatId}`}
              >
                <p className="sender">{msg.senderName}</p>
                <p className="message">{msg.message}</p>
                <p className="item">Item: {msg.productTitle}</p>
                <p className="time">{new Date(msg.createdAt).toLocaleString()}</p>
              </div>

            ))
          )}
        </div>
      </div>
    </div>
  );
}
