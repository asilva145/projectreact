import React , {useState , useEffect} from "react";
import { Form, Button,Image,Container,Row,Col } from "react-bootstrap";
import {toast} from "react-toastify"

function FormEditer(props){
  const [donneesRecues , setDonneesRecues] = useState({name: '', picture:"", abilities : ["",""] });
  const [ClientID , setclientID] = useState(props.location.search.substring(4,props.location.search.length));
  const [photos, setPhotos] = useState("");

  //Ajout de la gestion des erreurs
  useEffect(() => {
    getclient();
  },[]); //Si on enlève le second paramètre, on obtient une boucle infinie.

  //On récupère le Pokemon pour ensuite remplir le formulaire.
  async function getclients() {
    try {
      
      const response = await fetch("http://localhost:3001/clients/"+clientID);
      const reponseDeApi = await response.json();
      setDonneesRecues(reponseDeApi);
      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function editPokemon(nom,photos,attaque1, attaque2) { 
    try{ 
      const response = await fetch("http://localhost:3001/clients/"+ clientID, { 
        method:"PUT", 
        headers: {"Content-Type": "application/json"  }, 
        body:JSON.stringify({id : clientID,
          name: nom,
         
        }) 
      }); 
      if(response.ok){ 
        const jsonResponse = await response.json(); 
        props.history.push("/");
        toast.success("Modification du client " + nom);

        return jsonResponse; 
      } 
      throw new Error('Request failed!'); 
  } 
   catch(error){ 
      console.log(error); 
   } 
}

async function removePokemon() { 
    try{ 
    const response = await fetch('http://localhost:3001/clients/'+ clientID, { 
      method:'delete', 
    }); 
    if(response.ok){ 
      const jsonResponse = await response.json(); 
      props.history.push("/");
      toast.error("Supression du client ");

      return jsonResponse; 
    } 
    throw new Error('Request failed!'); 
} 
 catch(error){ 
    console.log(error); 
 } 
}

  function handleEdit(event){
    event.preventDefault();
    
    const nom = document.getElementById('nomclient').value;
   

    editclient(nom);
  }

 
    return (
      <>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="nomduclient">
                <Form.Label>Nom du client</Form.Label>
                <Form.Control type="text" defaultValue={donneesRecues.name}/> {/*/ Faire le test avec value*/}
              </Form.Group>
              
            <Button variant="primary" type="submit" onClick={handleEdit}>
                Enregistrer
            </Button>
            </Form>  
            </Col>    
          </Row>
          <p className="btn btn-danger mt-5" onClick={removePokemon}>Supprimer le Pokemon</p>
        </Container>
      </>
    );
  }

  export default FormEditer;