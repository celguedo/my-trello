import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { access } from "./api";
/* import Header from "./components/layout/Header"; */
import Home from "./components/home/Home";
import Login from "./components/access/Login";
import Register from "./components/access/Register";
import UserContext from "./context/UserContext";

function App() {
  const [user, setUser] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    /* const checkLoggedIn = async () => {
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
        });
      }
    };

    checkLoggedIn(); */
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          {/* <Header /> */}
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
