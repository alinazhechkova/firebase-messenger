import moment from "moment";
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
    if (presence.state === "offline") {
      const lastSeen = moment(presence.lastChanged).format("MMM DD HH:MM");
      return <div className="dot" title={`Last seen at ${lastSeen}`} />;
    } else {
      return <div className="dot_active dot" title="Online" />;
    }
  };

  return getDot(presence);
};

export default PresenceDot;
