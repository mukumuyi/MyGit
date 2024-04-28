import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Main from "./Main";
import Svg from "./Svg"
import Note from "./Note";
import ContactList from "./ContactList";

function App(props) {
  const [dispType, setDispType] = useState("timeline");
  const [resistState,setResistState] = useState(false);

  const handleLogInButtonClick = () => {
    setDispType("main");
  };
  
  console.log(dispType)
  return (
    <div>
      <Header submitBottonClick={handleLogInButtonClick}/>  
      {dispType === "login" && <Login flag={resistState} submitBottonClick={handleLogInButtonClick}/>}
      {dispType === "main" && <Main/>}
      {dispType === "timeline" && <Svg width = "1350" height = "650" />}
      {dispType === "contact" && <ContactList/>}
      <Footer />
    </div>
  );
}

export default App;
