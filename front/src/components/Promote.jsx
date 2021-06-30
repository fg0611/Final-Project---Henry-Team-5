import React, { useEffect } from "react";
import UserCard from "./UserCard.jsx";
import { getAllUsers } from "../redux/actions/userActions.js";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";

export default function Promote() {
  
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users.users);
  const change = useSelector((store) => store.users.change);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [change]);


  let cosas = users.map((e) => (
    <UserCard
      key={e.uuid}
      uuid={e.uuid}
      userName={e.userName}
      email={e.email}
      isAdmin={e.isAdmin}
    />
  ));
  return (
      <Container>
          {cosas}
      </Container>
  )
}
