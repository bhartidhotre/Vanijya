import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatBox from './ChatBox';
import { socket } from '../socket';
import '../styles/notification.css';

export default function OwnerNotifications({ currentUser }) {
  const [notifs, setNotifs] = useState([]);
  const [openChat, setOpenChat] = useState(null); // { chatId, otherUser, productId }
  const [usersCache, setUsersCache] = useState({});

  useEffect(() => {
    if (!currentUser) return;
    // load notifications
    axios.get(`http://localhost:5000/api/notifications/${currentUser._id}`, { headers: { 'x-user-id': currentUser._id } })
      .then(res => setNotifs(res.data))
      .catch(err => console.error(err));

    // socket setup
    if (!socket.connected) {
      socket.connect();
      socket.emit('setup', currentUser._id);
    }

    const handler = (notif) => {
      // prepend new notification
      setNotifs(prev => [notif, ...prev]);
    };
    socket.on('notification', handler);

    return () => socket.off('notification', handler);
  }, [currentUser]);

  const open = async (notif) => {
    // mark read in backend (optional)
    try {
      await axios.put(`http://localhost:5000/api/notifications/mark-read/${notif._id}`, {}, { headers: { 'x-user-id': currentUser._id } });
    } catch (e) {}
    // fetch or create chat info: we have chat id in notif.chat
    const chatRes = await axios.get(`http://localhost:5000/api/chats/${notif.chat}`, { headers: { 'x-user-id': currentUser._id } }).catch(()=>null);

    // fetch fromUser details: notif.fromUser comes as id or object
    const other = { _id: notif.fromUser, name: notif.fromUserName || (notif.fromUser?.name || 'User') };

    setOpenChat({ chatId: notif.chat, otherUser: other, productId: notif.product });
  };

  return (
    <div className="notif-panel">
      <h3>Notifications</h3>
      {notifs.length === 0 && <p>No notifications</p>}
      <ul>
        {notifs.map(n => (
          <li key={n._id} className={`notif-item ${n.isRead ? 'read' : 'unread'}`} onClick={() => open(n)}>
            <div><strong>{n.fromUser?.name || 'Someone'}</strong> <span>sent</span></div>
            <div className="notif-text">{n.text}</div>
            <div className="notif-meta">{new Date(n.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>

      {openChat && (
        <ChatBox
          chatId={openChat.chatId}
          productId={openChat.productId}
          currentUser={currentUser}
          otherUser={openChat.otherUser}
          onClose={() => setOpenChat(null)}
        />
      )}
    </div>
  );
}
