import io from "socket.io-client";

const socket = io("http://localhost:3000");

const App = () => {
  return <div>Hello socket.io</div>
};

export default App;
