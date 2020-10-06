import React from "react";
import { Link } from "react-router-dom";
import {Card} from "react-bootstrap"

export class Client extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
     
<Card>
  <Card.Img variant="top" picture={this.props.picture}/>
  <Card.Body>
          <Link to={"clientdata/" + this.props.nom + "?id=" + this.props.id}>
            <h4>nom : {this.props.nom}  </h4>
          </Link>
          <Link to={"clientdata/" + this.props.nom + "?id=" + this.props.id}>
            travail : {this.props.travail}
            
          </Link>

        </Card.Body>
        
      </Card>   
     

      </>
    );
  }
}