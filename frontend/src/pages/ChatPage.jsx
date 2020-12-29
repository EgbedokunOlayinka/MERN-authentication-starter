import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ChatPage = ({ history }) => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  return (
    <div>
      <p>chat</p>
    </div>
  );
};

export default ChatPage;
