import React from "react";

import { usePresence } from "../../../utils/usePresence";

const PresenceDot = ({ uid }: any) => {
  const presence = usePresence(uid);

  const getDot = (presence: any) => {
    if (!presence) {
      return <></>;
    }
    return presence.state === "online" ? (
      <div className="dot_active dot" />
    ) : (
      <div className="dot" />
    );
  };

  return getDot(presence);
};

export default PresenceDot;
