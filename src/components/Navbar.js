import React, {Component} from 'react'

class Navbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            adresse : ""
        };
        this.redirection = this.redirection.bind(this);
    }

    redirection = (e) => {
        if(this.props.connected){
            this.setState({
                adresse : e.target.name
            });
        }
        this.props.rediriger(this.state);
    }

    render(){
        return(
            <div class="navbar navbar-expand-md navbar-dark bg-dark">
            <a class="navbar-brand" href="#" name="accueil"  onClick = {this.redirection}>M1GLImmo</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            { this.props.connected ?  <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link " name="clients" href="#"  onClick = {this.redirection} >Clients<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item ">
                    <a class="nav-link" href="#" name="listebailleurs"  onClick = {this.redirection}>Liste des Bailleurs</a>
                    
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More +</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown01">
                    <button class="dropdown-item" name="listebailleurs"  onClick = {this.redirection}>Liste des Bailleurs</button>
                    <a class="dropdown-item" href="#">Credit Client</a>
                    <a class="dropdown-item" href="#">Debit Bailleur</a>
                    </div>
                </li>
                </ul>
                <ul>
                    <a class="nav-link " name="deconnecter" href="#"  onClick = {this.redirection} >Deconnecter</a>
                </ul>
            </div>:""}
            </div>
        )
    }

}

export default Navbar