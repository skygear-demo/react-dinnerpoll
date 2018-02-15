import React from "react";
import { Alert } from "reactstrap";

export default ({ event }) => {
  if (event) {
    let color = event.type === "error" ? "danger" : event.type;
    let message =
      event.type === "success"
        ? "SUCCESS"
        : `${event.type.toUpperCase()}: ${event.message}`;
    return <Alert color={color}>{message}</Alert>;
  }

  return null;
};
