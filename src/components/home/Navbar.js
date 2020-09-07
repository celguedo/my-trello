import React from "react";
import Navbar from "emerald-ui/lib/Navbar";
import Avatar from "emerald-ui/lib/Avatar";
import Nav from "emerald-ui/lib/Nav";
import DropdownButton from "emerald-ui/lib/DropdownButton";
import DropdownItem from "emerald-ui/lib/DropdownItem";

export default function NavbarTrello({ name, logout }) {
  const initialsName = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join(".")
    : "U";
  return (
    <Navbar breakAt="sm" theme="dark">
      <Navbar.Brand>
        <a href="/">
          <img src="/assets/imgs/icon_my_trello.png" alt="My Trello" />
        </a>
      </Navbar.Brand>

      <Nav>
        <DropdownButton
          noCaret
          fromRight
          id="dd2"
          title={<Avatar title={initialsName} />}
        >
          <DropdownItem eventKey="4" onClick={logout}>
            Logout
          </DropdownItem>
        </DropdownButton>
      </Nav>
    </Navbar>
  );
}
