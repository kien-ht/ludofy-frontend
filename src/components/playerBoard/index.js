import "./style.css";
import React from "react";
import { Card } from "react-bootstrap";
import cardBackground from "assets/images/player-board-name.png";
import cardBackgroundKey from "assets/images/player-board-name-key.png";

function PlayerBoard({ playerName, avatar, isReady, isRoomOwner }) {
  const readyClass = (isReady) => {
    const base = "ready-status mb-2";
    return isReady ? base + " text-light" : base + " text-danger";
  };

  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Card.Img
          className="player-board-bg"
          variant="top"
          src={isRoomOwner ? cardBackgroundKey : cardBackground }
        />
        {playerName && (
          <Card.ImgOverlay className="d-flex flex-column justify-content-between align-items-center py-0">
            <Card.Title>
              <div className="player-name mt-3" style={{ fontSize: "80%" }}>
                {playerName}
              </div>
            </Card.Title>
            {avatar && <Card.Img src={avatar} className="avatar" alt="" />}
            <Card.Title>
              <div className={readyClass(isReady)}>
                {isReady ? "Ready" : "Unready"}
              </div>
            </Card.Title>
          </Card.ImgOverlay>
        )}
      </Card>
    </div>
  );
}

export default PlayerBoard;
