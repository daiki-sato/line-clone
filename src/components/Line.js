import { Box, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { db, auth } from "../firebase.js";
import SendMessage from "./SendMessage.js";
import SignOut from "./SignOut";

function Line() {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <div>
      <SignOut />
      <div className="msgs">
        {messages.map(({ id, text, photoURL, uid, imageUrl, createdAt }) => (
          <Box>
            {createdAt && (
              <Typography
                align={uid === auth.currentUser.uid ? "right" : "left"}
              >
                {format(createdAt.toDate(), "yyyy年MM月dd日")}
              </Typography>
            )}
            <div
              key={id}
              className={`msg ${
                uid === auth.currentUser.uid ? "sent" : "received"
              }`}
            >
              <img src={photoURL} alt="" />
              {text && <p>{text}</p>}
              {imageUrl && <img src={imageUrl} alt="" />}
            </div>
          </Box>
        ))}
      </div>
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
}

export default Line;
