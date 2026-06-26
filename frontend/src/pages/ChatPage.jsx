import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "../components/ChatBox";

export default function ChatPage() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const chatIdFromUrl = searchParams.get("chatId");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser?._id; // ✔️ always use _id

  const [chatId, setChatId] = useState(chatIdFromUrl);
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    if (!productId || !userId) return;

    // If chatId already exists → no need to create chat again
    if (chatIdFromUrl) return;

    axios
      .post("http://localhost:5000/api/chats/create", {
        productId: productId,
        customerId: userId,
      })
      .then((res) => {
        setChatId(res.data._id);
        setOtherUser(
          res.data.customer._id === userId ? res.data.owner : res.data.customer
        );
      })
      .catch(console.error);
  }, [productId, userId]);

  if (!chatId) return <h2>Loading chat...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <ChatBox
        chatId={chatId}
        currentUser={currentUser}
        otherUser={otherUser}
        onClose={() => window.history.back()}
      />
    </div>
  );
}
