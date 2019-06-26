import React, {Component} from 'react';
import axios from 'axios';

class ListeClients extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            liste : [],
            idClient : 4
         };

        
        this.facturer2 = this.facturer2.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.listerClients();
    }

    listerClients = () => {
        axios.get('http://localhost:8080/M1GLImmo/immo?action=listeclients')
            .then(response => {
                //console.log(response)
                
                this.setState({
                    liste : response.data
                    
                })
            })
            .catch(error => {

            })
    };

    handleClick2 = (event) => {
        event.preventDefault();
        console.log(event.target.id)
        this.setState ({ idClient : event.target.id })
        console.log(this.state)
    };

    facturer2 = (e) => {
        let idc = e.target.id;
        axios.get("http://localhost:8080/M1GLImmo/immo?action=facturer&id="+e.target.id)
        .then(response => {
            if(true){
                //console.log(response.data.montant);
                this.setState({ montant : response.data.montant,
                idClient : idc });
                console.log(this.state);
                this.props.facturer(this.state);
            }
            
        })
        .catch(error => {
            
        });
        //console.log(this.state.idclient);
        //console.log(e.target.name);
        // this.setState({
        //     idClient : 2
        // });
        // console.log("idc : "+idc)
        // this.setState ({ idClient : 2 })
        // console.log(this.state)
                //this.props.facturer(this.state);
    }

    handleClick = (e) => {
       
        this.setState ({ idClient : 213 })
        console.log(this.state)
    }

    render() {
        return (
            <div class="tableau">
                <h1>Liste des Clients</h1>
                <div class="container">
                <table class="table table-bordered table-stripped">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>CNI</th>
                            <th>Montant Du</th>
                            <th>Facturer</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            this.state.liste.map(client => <tr key={client.id}>
                                <td>{client.nom}</td> <td>{client.cni}</td><td>{client.montantdu}</td>
                                <td><button class="btn btn-success btn-sm" id={client.id} onClick={this.facturer2}>Facturer</button></td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Nom</th>
                            <th>CNI</th>
                            <th>Montant Du</th>
                            <th>Facturer</th>
                        </tr>
                    </tfoot>

                </table>
                </div>
                <div class="modal modal-info fade" id="ajouter">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Ajout d'un Client</h4>
                            </div>
                            <div class="modal-body">
                                <p>One fine body&hellip;</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Annuler</button>
                                <button type="button" class="btn btn-outline">Ajouter</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-success" data-toggle="modal" data-target="#ajouter">Ajouter un Client</button>
            </div>
        );
    }
}

export default ListeClients;
