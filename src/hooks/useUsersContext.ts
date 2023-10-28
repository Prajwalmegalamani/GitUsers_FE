import { useState, useEffect } from "react";
import constate from "constate";

const useUsersContext = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("idle");
  const searchMinChars = 2;
  const responseDelay = 3500;
  const debouceDelay = 500;

  return {
    users,
    setUsers: setUsers,
    status,
    setStatus: setStatus,
    searchMinChars,
    responseDelay,
    debouceDelay,
  };
};

export const [UsersProvider, UsersContext] = constate(useUsersContext);
