import React from "react";

import { PresenceType, usePresence } from "../../../utils/usePresence";

interface Props {
  uid: string;
}

const PresenceDot = ({ uid }: Props) => {
  const presence = usePresence(uid);

  const getDot = (presence: PresenceType) => {
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
