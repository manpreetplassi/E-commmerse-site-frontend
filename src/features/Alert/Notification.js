import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { useNotification } from "./useNotification";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { clearNotification } = useNotification();

  const handleClose = (_, reason) =>
    reason !== "clickaway" && clearNotification();

    const snackbarStyle = {
      marginTop: "50px", // Adjust the pixel value as needed
    };
  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.timeout}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} 
      transformOrigin={{ vertical: "top", horizontal: "center" }} 
      style={snackbarStyle}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={notification.type}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
