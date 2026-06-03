import { useState } from 'react'
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
      <h2>Chat</h2>
      <textarea id="message"
          type="text"
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        >
        </textarea>
        <button id="send_btn" onClick={() => {
          setMessages([...messages, `${name}: ${message}`]);
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