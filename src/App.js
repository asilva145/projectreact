import React from "react";
import  clienthooks  from "./clienthooks"; 
import { Ajouter} from "./Ajouter"; 
import { PageNotFound } from "./PageNotFound";
import { Route, Switch, Redirect } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  let location = useLocation();
  return (
    <>
    <ToastContainer autoClose={3000} hideProgressBar />
      <Switch>
        <Route path="/" exact component={clienthooks} />
        <Route path="/Ajouter" component={Ajouter} />
        <Route path="/clientdata/:nom" component={FormEditer} />
        <Route component={PageNotFound} />
      </Switch>
      {(location.pathname !== "/Ajouter" && !location.pathname.startsWith("/clientdata")) }
      {(location.pathname !== "/")  }
      <br></br>
    </>
  );
}

export default App;

