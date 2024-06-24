import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatRoomProps {
  socket: Socket;
  userName: string;
  room: string;
} 

interface Message {
    author: string;
    message: string;
    time: string; 
}

const ChatRoom = ({ socket, userName, room }: ChatRoomProps) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

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
        setMessages((list) => [...list, message]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (message: Message) => {
      setMessages((list) => [...list, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-4">
        <h1 className="text-4xl text-center mb-8 text-violet-700 font-bold">
          Live Gossip
        </h1>
        <div className="bg-white p-4 rounded shadow-md mb-4 w-full">
          <div className="overflow-y-auto h-64 mb-4 border-b-2">
            <div className="text-center text-gray-500">
              {messages.map((message) => (
                <div  className="mb-2">
                  <span className="text-gray-600 font-bold">
                    {message.author}:
                  </span>{" "}
                  {message.message}{" "}
                  <span className="text-xs text-gray-400">
                    {message.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <input
              className="flex-1 border border-gray-300 p-2 rounded-l"
              type="text"
              placeholder="Enter your message"
              value={currentMessage}
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button
              className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-r"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
