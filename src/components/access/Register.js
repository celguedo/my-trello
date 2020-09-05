import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { access } from "../../api";
import Button from "emerald-ui/lib/Button";
import { setToken } from "../../utils";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const goBack = () => {
    history.push("/");
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await access.register(newUser);
      const loginRes = await access.login({ email, password });

      setUser({
        token: loginRes.data.token,
        user: loginRes.data.user
      });
      setToken(loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="container panel-center">
      <h2>My Trello App - Register</h2>
      <br />
      {error && (
        <div className="error-notice">
          <span>{error}</span>
          <button onClick={() => setError(undefined)}>X</button>
        </div>
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Your email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Your password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="register-password">Verify your password</label>
        <input
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-display-name">Your name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <Button type="submit" color="success">
          Register
        </Button>
      </form>
      <br />
      <Button onClick={goBack}>Go Back</Button>
    </div>
  );
}
