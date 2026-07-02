import React, { useState } from "react";
import axios from "axios";
import { FaRobot, FaTimes } from "react-icons/fa";

const ChatBot = () => {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMsg = {
      sender: "user",
      text: message
    };

    setChat(prev => [...prev, userMsg]);

    try {

      const { data } =
        await axios.post(
          "/api/v1/chat",
          { message }
        );

      setChat(prev => [
        ...prev,
        {
          sender: "ai",
          text: data.reply
        }
      ]);

      setMessage("");

    } catch(error){

      console.log(error);

    }

  };

  return (
    <>
      {/* Floating button */}

      <button
        onClick={() => setOpen(!open)}
        className="btn btn-primary rounded-circle"
        style={{
          position:"fixed",
          bottom:"25px",
          right:"25px",
          width:"60px",
          height:"60px",
          zIndex:"1000"
        }}
      >
        {open
          ? <FaTimes/>
          : <FaRobot/>
        }
      </button>

      {/* Chat Window */}

      {open && (

        <div
          className="card shadow"
          style={{
            position:"fixed",
            bottom:"100px",
            right:"25px",
            width:"350px",
            height:"450px",
            zIndex:"1000"
          }}
        >

          <div className="card-header bg-primary text-white">
            AI Assistant 🤖
          </div>

          <div
            className="card-body"
            style={{
              overflowY:"auto"
            }}
          >

            {chat.map((msg,index)=>(

              <div
                key={index}
                className={`mb-2 ${
                  msg.sender==="user"
                  ? "text-end"
                  : "text-start"
                }`}
              >

                <span
                  className={`badge ${
                    msg.sender==="user"
                    ? "bg-primary"
                    : "bg-secondary"
                  }`}
                >
                  {msg.text}
                </span>

              </div>

            ))}

          </div>

          <div className="card-footer d-flex">

            <input
              className="form-control"
              value={message}
              onChange={(e)=>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Ask anything..."
            />

            <button
              className="btn btn-secondary ms-2"
              onClick={sendMessage}
            >
              Send
            </button>

          </div>

        </div>

      )}

    </>
  );
};

export default ChatBot;