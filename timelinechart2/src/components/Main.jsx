import React from "react";
import Card from "./Card";
import Contacts from "../contacts";

function Main() {
  return (
    <section id="features">
      <div className="container">
        {Contacts.map((contact) => {
          return (
            <Card
              key={contact.id}
              name={contact.name}
              img={contact.imgURL}
              tel={contact.phone}
              mail={contact.email}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Main;
