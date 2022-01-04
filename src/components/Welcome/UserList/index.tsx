import React, {
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { auth, db } from "../../../firebase";

import { MessengerContext } from "../../../context/Provider";

import PresenceDot from "./PresenceDot";

import "./UserList.scss";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import useClickOutside from "../../../hooks/useClickOutside";

interface Props {
  setUser: React.Dispatch<SetStateAction<User | null>>;
}

const UserList = ({ setUser }: Props) => {
  const [users, setUsers] = useState<User[]>();
  const [mobileShow, setMobileShow] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { currentUser, setCurrentChat, currentChat } =
    useContext<any>(MessengerContext);

  const { width } = useWindowDimensions();

  useEffect(() => {
    const users = db
      .collection("users")
      .where("uid", "!=", auth.currentUser!.uid);
    const unsub = users.onSnapshot(
      { includeMetadataChanges: true },
      (querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc) => users.push(doc.data()));
        setUsers(users);
      }
    );

    return () => unsub();
  }, []);

  const currentChatHandler = (user: User) => {
    setUser(user);
    const id = getChatId(user.uid);
    setCurrentChat(id);
  };

  const getChatId = (uid: string) => {
    const id =
      currentUser!.uid > uid
        ? `${currentUser!.uid + uid}`
        : `${uid + currentUser!.uid}`;

    return id;
  };

  useClickOutside(buttonRef, () => setMobileShow(false));

  return (
    <>
      {width < 768 && (
        <button
          className="users-list__open-btn"
          onClick={() => setMobileShow(!mobileShow)}
          ref={buttonRef}
        >
          Users
        </button>
      )}
      <div
        className={`users-list ${width < 768 ? "users-list__mobile" : ""} ${
          mobileShow ? "users-list__mobile_active" : ""
        }`}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {users &&
          users.map((user) => (
            <div
              className={`user-wrap ${
                getChatId(user.uid) === currentChat ? "user-wrap_active" : ""
              } `}
              key={user.uid}
              onClick={() => currentChatHandler(user)}
            >
              <h2>
                {user.name}
                <PresenceDot uid={user.uid} />
              </h2>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserList;
