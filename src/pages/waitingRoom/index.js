import "./style.css";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import WithAuth from "components/WithAuth";
import PlayerBoard from "components/playerBoard";
import { WrapperContext } from "App";
import io from "socket.io-client";
import Avatar from "assets/images/ready-sign.png";
import { startGameService } from "services/waitingRoom.service";

const SERVER_DOMAIN = "http://localhost:3333";
const socket = io(SERVER_DOMAIN, {
  withCredentials: true,
});

function WaitingRoom() {
  const { thisPlayer, setThisPlayer, modal, setModal } = useContext(
    WrapperContext
  );

  const [playersList, setPlayersList] = useState([]);

  const history = useHistory();

  const readyStateColor = (isReady) => {
    const base = "custom-btn mr-3 ";
    const separate = isReady ? "text-danger" : "text-light";
    return base + separate;
  };

  const readyStateHandler = () => {
    setThisPlayer({
      ...thisPlayer,
      isReady: !thisPlayer?.isReady,
    });
    socket.emit("toggleReadyState", {
      isReady: !thisPlayer?.isReady,
    });
  };

  const startHandler = () => {
    const allPlayers = playersList.filter((p) => p.userName);
    if (allPlayers.length === 1) {
      setModal({
        isShown: true,
        title: "",
        content: "Can't start the game with only one player!",
      });
      return;
    }

    const isAllPlayerReady = allPlayers.every((p) => p.isReady);
    if (isAllPlayerReady) {
      socket.emit("startGame");
    } else {
      setModal({
        isShown: true,
        title: "",
        content: "Can't start the game when everyone isn't ready!",
      });
    }
  };

  const randomName = [
    "Rollers_Toilet",
    "Dislike_Breakfast",
    "Cat_Clock",
    "Urine_Clock",
    "Monster_Book",
    "Sink_Plants",
    "Dislike_YouTube",
    "Kitty_Soda",
    "Towel_Video_games",
    "Plants_Printer",
  ];

  useEffect(() => {
    // Entering event
    thisPlayer.userName = randomName[Math.floor(Math.random() * 10)];

    socket.open();
    socket.emit("joinRoom", thisPlayer);

    socket.on("joinRoom", ({ playersList, me }) => {
      setPlayersList(playersList);
      setThisPlayer(me);
    });

    socket.on("newPlayerEnter", ({ playersList, newPlayer }) => {
      setPlayersList(playersList);
      console.log(`${newPlayer.userName} has entered this game`);
    });

    // Main Handler
    socket.on("toggleReadyState", ({ playersList }) => {
      setPlayersList(playersList);
    });

    socket.on("startGame", async () => {
      // const response = await startGameService(playersList);
      // console.log(response);
      window.location.assign(`${SERVER_DOMAIN}/mainplay`);
      // if (response.success) {
      //   setModal({
      //     isShown: true,
      //     title: "",
      //     content: "The game is starting...",
      //   });
      // }
    });

    // leaving event
    socket.on("duplicateConnection", () => {
      setModal({
        isShown: true,
        title: "",
        content: "You are already in the game in another window!",
      });
      history.push("/list-room");
    });

    socket.on("fullSlots", () => {
      setModal({
        isShown: true,
        title: "",
        content: "The room is full. Redirecting back to list room...",
      });
      history.push("/list-room");
    });

    socket.on("playerLeave", ({ playersList, leftPlayer }) => {
      setPlayersList(playersList);
      console.log(`${leftPlayer.userName} has left this game`);
    });
  }, []);

  useEffect(() => {
    if (playersList && playersList.length > 0) {
      let foundPlayer = playersList.find(
        (p) => p.userName === thisPlayer.userName
      );
      if (!foundPlayer) return;
      setThisPlayer(foundPlayer);
    }
  }, [playersList]);

  return (
    <div className="waiting-room-bg">
      <div className="pt-5 pl-5 playerboard-container">
        <Row className="playerboard-row">
          {playersList.map((p) => {
            return (
              <Col sm={6} className="mb-4" key={p.key}>
                <PlayerBoard
                  playerName={p.userName}
                  avatar={p.userName && Avatar}
                  isReady={p?.isReady}
                ></PlayerBoard>
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="d-flex justify-content-end">
        <div
          onClick={readyStateHandler}
          className={readyStateColor(thisPlayer?.isReady)}
        >
          {thisPlayer.isReady ? "Unready" : "Ready"}
        </div>
        {thisPlayer.isRoomOwner && (
          <div onClick={startHandler} className="custom-btn mr-3">
            Start
          </div>
        )}
      </div>
    </div>
  );
}

export default WithAuth(WaitingRoom);

// the new room owner doesn't change state, need to figure out the way to notify
