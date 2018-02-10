import React from "react";
import { Alert } from "reactstrap";
import skygear from "skygear";

export default ({ error }) => {
  if (error === null) {
    return null;
  } else {
    let { code, message } = error;
    if (
      code === skygear.ErrorCodes.InvalidCredentials ||
      code === skygear.ErrorCodes.ResourceNotFound
    ) {
      message = "Error: invalid username or password";
    }
    return <Alert color="danger">{`Error: ${message}`}</Alert>;
  }
};
