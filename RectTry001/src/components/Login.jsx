import React from "react";
import Button from "./Button";
import Input from "./Input";

function Login(props) {
  return (
    <section id="features">
      <div className="container">
        <h1>Hello!</h1>
        <Input type="text" placeholder="What's your name?" />
        {!props.flag && (
          <input type="password" placeholder="Confirm Password" />
        )}
        <Button
          text="Submit"
          color="White"
          touchColor="Black"
          onClick={props.submitBottonClick}
        />
      </div>
    </section>
  );
}

export default Login;
