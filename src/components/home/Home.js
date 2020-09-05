import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Panel from "emerald-ui/lib/Panel";
import Button from "emerald-ui/lib/Button";
import { access } from "../../api";
import { FETCH_STATUS } from "../../config";
import Spinner from "emerald-ui/lib/Spinner";
import styled from "styled-components";

const PanelStyled = styled(Panel)`
  padding: 30px;
`;

export default function Home() {
  const { user } = useContext(UserContext);
  const { fetchStatus } = user;
  const history = useHistory();

  const logout = async () => {
    let token = localStorage.getItem("auth-token");
    await access.logout(token);

    localStorage.setItem("auth-token", "");
    history.push("/");
    history.go();
  };

  return (
    <>
      {user.user ? (
        <Navbar name={user.user.displayName} logout={logout} />
      ) : (
        <div className="container panel-center">
          {fetchStatus === FETCH_STATUS.LOADING ? (
            <Spinner />
          ) : (
            <PanelStyled>
              <h1>Welcome to My-Trello app</h1>
              <h3>please choose your way</h3>
              <br />
              <Link to="/login">
                <Button>Log in</Button>
              </Link>
              <br />
              <br />
              <Link to="/register">
                <Button>Register</Button>
              </Link>

              <br />

              <h5>Carlos Andres Elguedo</h5>
            </PanelStyled>
          )}
        </div>
      )}
    </>
  );
}
