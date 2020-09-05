import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { access } from "./api";
import { FETCH_STATUS } from "./config";
import Home from "./components/home/Home";
import Login from "./components/access/Login";
import Register from "./components/access/Register";
import UserContext from "./context/UserContext";

function App() {
  const [user, setUser] = useState({
    token: undefined,
    user: undefined,
    fetchStatus: FETCH_STATUS.LOADING,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await access.verifyToken(token);
      if (tokenRes.data) {
        const userRes = await access.getUser(token);
        setUser({
          token,
          user: userRes.data,
          fetchStatus: FETCH_STATUS.LOADED,
        });
      } else {
        setUser({
          token: null,
          user: null,
          fetchStatus: FETCH_STATUS.NOT_LOADED,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
