import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); // do kogo wyslac
  const wsRef = useRef(null); // holds the ws connection no rerenders

  useEffect(()=>{
    if (!registered) return; // only connect to the websocket if user is registered

      const ws = new WebSocket("ws://localhost:6060");
      wsRef.current = ws; // stores a value, but changing it doesnt cause a rerender

      ws.onopen = () => {
        // Handle connection open
        console.log('WS: Connected to server');
        //ws.send('NodeClient: Hello from node.js client');
        ws.send(JSON.stringify({
              type: "register",
              name: name
          }));
      };

      ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          // zwracac liste uzytkownikow
          // messages.forEach(addMessage);
          
          //... spread operator - ccopy existing items
          if (data.type === "message") {
              setMessages((prev) => [...prev, data.nameFrom + ": " + data.message]);
          }

          if (data.type === 'users') {
              setUsers(data.users);
          }
      };

      return () => ws.close();
  }, [registered]);

  if(!registered){
    return (
    <><div>
      <h2>Join Chat</h2>
      <input id="name"
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button id="connect_btn"
        type="button"
        
        onClick={() => setRegistered((registered) => registered = true)}
        >
          Connect
        </button>

    </div>
    </>
  );

  }else{
    return(
    <><div>
      <h2>Hello {name}!</h2>
      <textarea id="message"
          type="text"
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        >
        </textarea>
        <button id="send_btn" onClick={() => {
          wsRef.current.send(JSON.stringify({
            type: "message",
            nameFrom: name,
            nameTo: selectedUser || null,
            message: message
          }));
          setMessage(""); // clear input
        }}>
          Send
        </button>

    </div>
    <div id="messages_div">
          {messages.map((msg, i) => (<p key={i}>{msg}</p>))}
    </div>
    </>
    );
  }

  
}

export default App;