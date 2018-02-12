import React from "react";
import { Alert } from "reactstrap";

export default ({ event }) => {
  if (event) {
    let alertColor = event.type === "error" ? "danger" : event.type;
    return (
      <Alert color={alertColor}>{`${event.type.toUpperCase()}: ${
        event.message
      }`}</Alert>
    );
  }

  return null;
};
