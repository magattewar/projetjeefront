import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Accueil from './components/Accueil'
import Connexion from './components/Connexion'
import axios from 'axios'
import ListeClients from './components/ListeClients';
import ListeBailleurs from './components/ListeBailleurs'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Facturation from './components/Facturation'
import { PDFViewer } from '@react-pdf/renderer';

 
class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      connected : false,
      listeBiens : [],
      lien : "accueil"
    };

    //this.checkConnected()
    //this.listerBiens()
    this.deconnecter = this.deconnecter.bind(this);
  }


  /**
   * Gere la connexion de l'utilisateur
   */
  connecter = (user) => {
    
    //axios.get()
    
    //console.log(user);
    if(user.connected)
      this.setState({
        connected : true,
        lien : "accueil"
      })
    
  };

  rediriger = (lien) => {
    switch(lien.adresse){
      case "accueil":
        this.setState({
          lien : "accueil"
        })
        break;
      case "clients":
          this.setState({
            lien : "clients"
          })
        break;
      case "deconnecter":
          this.setState({
            lien : "deconnecter"
          })
        break;
      case "listebailleurs":
          this.setState({
            lien : "listebailleurs"
          })
        break;
      default:
        break;
    }
  }


  deconnecter = (e) => {
    this.setState({
      connected : false
    })
    this.render()
  }




  /* checkConnected = () => {
    axios.get('http://localhost:8080/M1GLImmo/immo?action=checkconnected')
            .then(response => {
              console.log(response);
                if(response.data.matched)
                    this.setState({ connected : true,
                                    login : response.data.login,
                                    password : response.data.password })
            })
            .catch(error => {
                
            })
  }; */


  render(){
    return(
    <Router>
      <div class="navbar navbar-expand-md navbar-dark bg-dark">
        <Link class="navbar-brand" to="/">M1GLImmo</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
               <Link class="navbar-brand" to="/clients">Clients</Link>
            </li>
            <li class="nav-item ">
              <Link class="navbar-brand" to="/bailleurs">Bailleurs</Link>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More +</a>
                <div class="dropdown-menu" aria-labelledby="dropdown01">
                <button class="dropdown-item" name="listebailleurs"  >Liste des Bailleurs</button>
                <Link class="dropdown-item" to="/facturer">Facturer</Link>

                <a class="dropdown-item" href="#">Debit Bailleur</a>
                </div>
            </li>
            </ul>
            <ul>
                <a class="nav-link " name="deconnecter" href="#" onClick = {this.deconnecter}  >Deconnecter</a>
            </ul>
            
        </div>
        
      </div>
      <div class="row" className="App">
      <Route exact path="/" render={props => this.state.connected ? <Accueil /> : <Connexion connecter = {this.connecter} />}/>
      <Route path="/clients" render={props => this.state.connected ? <ListeClients /> : <Connexion connecter = {this.connecter} />}/>
      <Route path="/bailleurs" render={props => this.state.connected ? <ListeBailleurs /> : <Connexion connecter = {this.connecter} />}/>
      <Route path="/facturer" render={props => this.state.connected ? <div class="container"><PDFViewer><Facturation /></PDFViewer></div> : <Connexion connecter = {this.connecter} />}/>
      </div>
    </Router>);

  }


  /* render(){
    if(this.state.connected){
      switch(this.state.lien){
        case "accueil":
            return (
              <div className="App" >
                <Navbar rediriger = {this.rediriger} connected={this.state.connected} />
                <Accueil />
              </div>
            );
          break;
        case "clients":
            return (
              <div className="App">
                <Navbar rediriger = {this.rediriger} connected={this.state.connected} />
                <ListeClients />
              </div>
            );
          break;
        case "deconnecter":
          this.setState({
            connected : false
          });
          return (
            <div className="App">
              <Navbar rediriger = {this.rediriger} connected={this.state.connected} />
              <Connexion connecter={this.connecter} />
            </div>
          );
          break;

        case "listebailleurs":
          return (
            <div className="App">
              <Navbar rediriger = {this.rediriger} connected={this.state.connected} />
              <ListeBailleurs />
            </div>
          );
        break;
        default:
            return (
              <div className="App">
                <Navbar rediriger = {this.rediriger} connected={this.state.connected} />
                <Connexion connecter={this.connecter} />
              </div>
            );
          break;
      }
      
    } else {
      return (
        <div className="App">
          <Navbar rediriger = {this.rediriger} connected={this.state.connected} />
          <Connexion connecter={this.connecter} />
        </div>
      );
    }
    
  } */
}

export default App;


