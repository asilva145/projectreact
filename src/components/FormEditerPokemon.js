import React from "react";
import { Form, Button,Image,Container,Row,Col } from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify"

export class FormEditerPokemon extends React.Component {
  constructor(props) {
    super(props);
    //Afin d'éviter une erreur undefined lorsqu'on lit le tableau abilities, on l'initialise à un tableau vide pour débuter.
    this.state = {
                  donneesRecues: {name: '', picture:"",  }, 
                  setErrors : {}};

    this.handleEdit = this.handleEdit.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.editclient = this.editclient.bind(this);
    this.removeclient = this.removeclient.bind(this);
  }

  //On récupère le Pokemon pour ensuite remplir le formulaire.
  async componentDidMount() {
    try {
      await this.setState({clientID : this.props.location.search.substring(4,this.props.location.search.length)});
      await console.log(this.state.clientID);
      const response = await fetch("https://crudcrud.com/api/5da054a8c5cf4211b57c0aa0a9460262/clients/"+this.state.clientID);
      const reponseDeApi = await response.json();
      this.setState({ donneesRecues: reponseDeApi });
      console.log(this.state.donneesRecues);
      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async editClient(nom,photo) { 
    try{ 
      const response = await fetch('https://crudcrud.com/api/5da054a8c5cf4211b57c0aa0a9460262/clients/'+ this.state.clientID, { 
        method:'PUT', 
        headers: {'Content-Type': 'application/json'  }, 
        body:JSON.stringify({_id : this.state.clientID,
          name: nom,
          picture: photo,
          
        }) 
      }); 
      if(response.ok){ 
        const jsonResponse = await response.json(); 
        this.props.history.push("/");
        toast.success("Modification du Client " + nom);

        return jsonResponse; 
      } 
      throw new Error('Request failed!'); 
  } 
   catch(error){ 
      console.log(error); 
   } 
}

async removePokemon() { 
    try{ 
    const response = await fetch('https://crudcrud.com/api/5da054a8c5cf4211b57c0aa0a9460262/clients/'+this.state.clientID, { 
      method:'DELETE', 
    }); 
    if(response.ok){
      console.log(response);
      //const response = await response; 
      //const jsonResponse = await response.json(); 
      console.log("SUPPRESSION!");
      this.props.history.push("/");
      toast.error("Supression du Client ");

      //return jsonResponse; 
      return response;
    } 
    throw new Error('Request failed!'); 
} 
 catch(error){ 
    console.log(error); 
 } 
}

  handleEdit(event){
    event.preventDefault();
    
    const nom = document.getElementById('nomClient').value;
    const photo = document.getElementById('photoClient').value;
    

    this.editClient(nom,photo,attaque1,attaque2);
  }

  handlePhoto(event){
    const photos = document.getElementById('photoClient').value;
    this.setState( {photo : photos});
  }

  render() {
    return (
      <>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="nomClient">
                <Form.Label>Nom du client</Form.Label>
                <Form.Control type="text" defaultValue={this.state.donneesRecues.name}/> {/*/ Faire le test avec value*/}
              </Form.Group>
              <Form.Group controlId="photoClient">
                <Form.Label>URL d'une photo du client </Form.Label>
                <Form.Control type="text" placeholder="Entrer une URL valide" onBlur={this.handlePhoto} defaultValue={this.state.donneesRecues.picture}/>
              </Form.Group>
              {this.state.donneesRecues.picture !== "" && <Image src={this.state.donneesRecues.picture} rounded width="125"/>}
             

            <Button variant="primary" type="submit" onClick={this.handleEdit}>
                Enregistrer
            </Button>
            </Form>  
            </Col>    
          </Row>
          <p className="btn btn-danger mt-5" onClick={this.removeClient}>Supprimer le Client</p>
        </Container>
      </>
    );
  }
}
