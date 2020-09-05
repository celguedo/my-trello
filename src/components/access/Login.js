import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { access } from "../../api";
import Button from "emerald-ui/lib/Button";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const goBack = () => {
    history.push("/");
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await access.login(loginUser);
      setUser({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="container panel-center">
      <h1>My Trello App - Access</h1>
      <br />
      {error && (
        <div className="error-notice">
          <span>{error}</span>
          <button onClick={() => setError(undefined)}>X</button>
        </div>
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" color="primary">
          Log In
        </Button>
      </form>
      <br />
      <Button onClick={goBack}>Go Back</Button>
    </div>
  );
}
