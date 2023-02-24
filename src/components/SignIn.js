import { Button, Box, Grid, Paper, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import React from "react";
import firebase from "firebase/compat/app";
import { auth } from "../firebase.js";

function SignIn() {
  const signInWithGoggle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: "50vh",
          width: "280px",
          m: "20px auto",
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography variant={"h5"} sx={{ m: "30px" }}>
            Sign In
          </Typography>
        </Grid>
        <Box mt={3}>
          <Button
            onClick={signInWithGoggle}
            color="primary"
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon color="primary" fontSize="large" />}
            size="large"
          >
            グーグルでログインする
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default SignIn;
