import React from "react";
import Alert from "emerald-ui/lib/Alert";
import Button from "emerald-ui/lib/Button";

export default function AlertMessage({ text, show, setShow }) {
  return (
    <Alert style={{ display: `${show ? "flex" : "none"}` }}>
      <div>{text ? text : "Please check your data"}</div>
      <div className="btn-toolbar">
        <Button
          color="info"
          onClick={() => {
            setShow(!show);
          }}
        >
          Accept
        </Button>
      </div>
    </Alert>
  );
}
