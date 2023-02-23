import { Button } from "@mui/material";
import { auth } from "../firebase.js";
import React from "react";

function SignOut() {
  return (
    <div>
      <Button onClick={() => auth.signOut()}>サインアウト</Button>
    </div>
  );
}

export default SignOut;
