import { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("joinRoom", room); //sending it to the server
    }
  };
  return (
    <div>
      <h1 className="text-3xl flex justify-center py-5 text-violet-700">
        Gossip
      </h1>
      <div className="flex justify-center">
        <input
          placeholder="Enter your name"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="Enter Room ID"
          type="text"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-center items-center py-6">
        <button className="bg-black hover:bg-violet-700 text-white font-bold py-2 px-1 rounded justify-center flex " onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
}
