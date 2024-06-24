import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatRoomProps {
  socket: Socket;
  userName: string;
  room: string;
}

const ChatRoom = ({ socket, userName, room }: ChatRoomProps) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const message = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", message);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    console.log("message sent lol");
    socket.on("receiveMessage", (message) => {
      console.log(message);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  return (
    <div>
      <div>
        <h1 className="text-4xl justify-center items-center flex">
          Live Gossip
        </h1>
      </div>
      <div className="justify-center items-center flex">ChatBody</div>
      <div className="justify-center items-center flex">
        <input
          type="text"
          placeholder="Enter your message"
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
