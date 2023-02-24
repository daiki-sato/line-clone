import React, { useState } from "react";
import { db, auth } from "../firebase.js";

import firebase from "firebase/compat/app";
import { Input, Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import ImageUpload from "./ImageUpload.js";

function SendMessage() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(undefined);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message === "") {
      alert("メッセージを入力してください");
      return;
    }
    const { uid, photoURL } = auth.currentUser;
    db.collection("messages").add({
      text: message,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
  };

  const handleImage = (event) => {
    const image = event.target.files[0];
    setImagePreview(event.target?.result);
    setImage(image);
  };

  return (
    <div>
      {image === "" ? (
        <form onSubmit={sendMessage}>
          <div className="sendMsg">
            <Button
              endIcon={<ImageIcon color="action" fontSize="large" />}
              component="label"
            >
              <Input
                accept="image/*"
                multiple
                type="file"
                sx={{ display: "none" }}
                onChange={handleImage}
              />
            </Button>
            <Input
              style={{
                width: "78%",
                fontSize: "15px",
                fontWeight: "550",
                marginLeft: "5px",
                marginBottom: "-3px",
              }}
              type="text"
              placeholder="メッセージを入力してください"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Button
              type="submit"
              endIcon={<SendIcon color="primary" fontSize="large" />}
            ></Button>
          </div>
        </form>
      ) : (
        <ImageUpload
          imagePreview={imagePreview}
          image={image}
          setImage={setImage}
        />
      )}
    </div>
  );
}

export default SendMessage;
