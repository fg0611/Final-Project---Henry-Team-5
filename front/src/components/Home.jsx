import React, { useEffect } from "react";
import Carouselmages from "./Carousel";
import { useDispatch } from "react-redux";
import { changeOrderStatus } from "../redux/actions/cartActions.js";

export function Home() {
  const dispatch = useDispatch();

  // userId = JSON.parse(DondeSeaQueLoGuarden.getItem('ElUuid'))
  const userId = "153b7a39-ba64-48fc-a326-679ecdddbe04";

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("status")) {
      dispatch(changeOrderStatus(userId));
    }
    
    if (url.includes('loginGoogle')){
      const token = url.split('=')[2];
      window.sessionStorage.setItem('user', token)
    }
    //Aca van los if's para las autenticaciones
  
  }, [dispatch]);

  return (
    <div>
      <Carouselmages />
    </div>
  );
}

export default Home;
