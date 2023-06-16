import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    addMessage('Hello! How can I assist you today?');
  }, []);

  const addMessage = (text, sender = 'bot') => {
    const newMessage = { text, sender };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    addMessage(input, 'user');
    setInput('');

    axios.post('/api/chatbot', { message: input })
      .then((response) => {
        addMessage(response.data.reply);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="chatbot-input" onSubmit={handleSubmit}>
        <input type="text" placeholder="Type your message..." value={input} onChange={handleInput}/>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;