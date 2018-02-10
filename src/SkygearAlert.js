import React from "react";
import { Alert } from "reactstrap";
import skygear from "skygear";

export default ({ error }) => {
  if (error === null) {
    return null;
  } else {
    let message = "";
    switch (error.code) {
      case skygear.ErrorCodes.InvalidCredentials:
        message = "invalid username or password";
        break;
      case skygear.ErrorCodes.ResourceNotFound:
        message = "invalid username or password";
        break;
      case skygear.ErrorCodes.Duplicated:
        message = "username not available";
        break;
      default:
        message = error.message;
        break;
    }
    return <Alert color="danger">{`Error: ${message}`}</Alert>;
  }
};
