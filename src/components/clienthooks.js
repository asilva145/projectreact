import React, { useState, useEffect } from "react";
import { Client } from "./Client";

function clienthooks() {
  const [donneesRecues, setDonneesRecues] = useState([]);

  //Ajout de la gestion des erreurs
  useEffect(() => {
    getclient();
  }, [donneesRecues.join(",")]); //Si on enlève le second paramètre, on obtient une boucle infinie.

  async function getclient() {
    try {
      const response = await fetch("http://localhost:3003/clients");
      const reponseDeApi = await response.json();
      setDonneesRecues(reponseDeApi);
      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div class="container">
  <div classp class="text-center jumbotron">
    <h1>BOTTIN TELEPHONIQUE</h1>
  
  </div>
  {donneesRecues.map((key, i) => (
        <Client nom={key.name} travail={key.travail} id={key.id}  key={key.name + key.id + key.travail}></Client>
      ))}
</div>
      
    
    </div>
  );
}

export default clienthooks;