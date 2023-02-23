import { Button, Typography } from "@mui/material";
import { auth } from "../firebase.js";
import React from "react";

function SignOut() {
  return (
    <div className="header">
      <Button
        onClick={() => auth.signOut()}
        style={{ color: "white", fontSize: "15px" }}
      >
        サインアウト
      </Button>
      <Typography>{auth.currentUser.displayName}</Typography>
    </div>
  );
}

export default SignOut;
