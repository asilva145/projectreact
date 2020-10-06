import React from "react";           
import  clienthooks  from "./clienthooks"; 
import { Ajouter} from "./Ajouter"; 
import  Editer  from "./Editer";
import { Page404 } from "./Page404";
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
        <Route path="/ajouter" component={Ajouter} />
        <Route path="/Client/:nom" component={Editer} />
        <Route component={Page404} />
      </Switch>
      {(location.pathname !== "/ajouter" && !location.pathname.startsWith("/clients")) }
      {(location.pathname !== "/") }
      <br></br>
    </>
  );
}

export default App;