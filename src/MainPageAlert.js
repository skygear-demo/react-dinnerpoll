import React from "react";
import { Alert } from "reactstrap";

export default ({ event }) => {
  if (event) {
    let color = "";
    let message = "";
    switch (event.type) {
      case "success":
        color = "success";
        message = "Success !";
        break;
      case "warning":
        color = "warning";
        message = `Warning: ${event.message}`;
        break;
      case "error":
        color = "danger";
        message = `Error: ${event.message}`;
        break;
      default:
        return null;
    }
    return (
      <Alert
        color={color}
        style={{
          position: "fixed",
          width: "30%",
          top: 20,
          right: 20,
          zIndex: 1
        }}
      >
        {message}
      </Alert>
    );
  }

  return null;
};
