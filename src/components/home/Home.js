import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="page">
      {user.user ? (
        <h1>Welcome {user.user.displayName}</h1>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}
