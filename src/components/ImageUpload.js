import { Typography, Button } from "@mui/material";
import React, { useState } from "react";
import firebase, { storage } from "../firebase.js";
import { db, auth } from "../firebase.js";
import SendIcon from "@mui/icons-material/Send";

const ImageUpload = ({ image, imagePreview, setImage }) => {
  // const [imageUrl, setImageUrl] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
    }

    // アップロード処理
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };
  const next = (snapshot) => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot, "snapshot");
  };
  const error = (error) => {
    // エラーハンドリング
    console.log(error);
  };
  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    const { uid, photoURL } = auth.currentUser;
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        // setImageUrl(fireBaseUrl);
        db.collection("messages").add({
          photoURL,
          uid,
          imageUrl: fireBaseUrl,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });
    setImage("");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="sendMsg">
          <img
            style={{ width: "500", height: "500" }}
            src={URL.createObjectURL(image)}
            alt=""
          />
          <Typography
            style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
              textAlign: "center",
            }}
          >
            写真選択中
          </Typography>
          <Button
            type="submit"
            endIcon={<SendIcon color="primary" fontSize="large" />}
          ></Button>
        </div>
      </form>
    </>
  );
};

export default ImageUpload;
