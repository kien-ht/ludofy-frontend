import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import WaitingRoom from "./pages/waitingRoom";
import ListRoom from "./pages/listRoom";
import { Switch, Route, useHistory } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";
import { CLEAR_TOKEN } from "commons/helpers";
import { verifyToken } from "services/auth.service";
import SmallModal from "components/modals/SmallModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const WrapperContext = createContext();

function App() {
  const [thisPlayer, setThisPlayer] = useState({});

  const [modal, setModal] = useState({
    isShown: false,
    title: "",
    content: "",
  });

  const history = useHistory();

  const logout = () => {
    CLEAR_TOKEN();
    history.push("/login");
  };

  const contextState = {
    thisPlayer,
    setThisPlayer,
    modal,
    setModal,
    logout,
  };

  const checkToken = async () => {
    const response = await verifyToken();

    if (response.success) {
      setThisPlayer(response.data);
    } else {
      CLEAR_TOKEN();
    }
  };

  // checkToken();

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <WrapperContext.Provider value={contextState}>
      <div className="App">
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/list-room" exact>
            <ListRoom />
          </Route>
          <Route path="/waiting-room" exact>
            <WaitingRoom />
          </Route>
        </Switch>
      </div>
      <SmallModal
        isShown={modal.isShown}
        title={modal.title}
        content={modal.content}
        setModal={setModal}
      />
    </WrapperContext.Provider>
  );
}

export default App;
