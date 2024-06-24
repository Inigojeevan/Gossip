import { useState } from "react";
import io from "socket.io-client";
import ChatRoom from "./components/ChatRoom";

const socket = io("http://localhost:3000");

export default function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("joinRoom", room); //sending it to the server
      setShowChat(true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {!showChat ? (
        <div className="text-center">
          <h1 className="text-3xl mb-8 text-violet-700 font-bold">Gossip</h1>
          <div className="mb-4">
            <input
              className="border border-gray-300 p-2 m-2 rounded"
              placeholder="Enter your name"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              className="border border-gray-300 p-2 m-2 rounded"
              placeholder="Enter Room ID"
              type="text"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      ) : (
        <ChatRoom socket={socket} userName={name} room={room} />
      )}
    </div>
  );
}
