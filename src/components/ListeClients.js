import React, {Component} from 'react';
import axios from 'axios';

class ListeClients extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            liste : [],
            dateFacturation : "",
            nom : "",
            cni : "",
            type : "",
            montant : ""
         };

        this.listerClients();
        this.facturer = this.facturer.bind(this);
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

    facturer = (e) => {
        axios.get("http://localhost:8080/M1GLImmo/immo?action=facturer&id="+e.target.id)
        .then(response => {
            console.log(response.data);
            this.setState({
                dateFacturation : response.data.dateFacturation,
                nom : response.data.nom,
                cni : response.data.cni,
                type : response.data.type,
                montant : response.data.montant
            })
            console.log(this.state);
        })
        .catch(error => {
            
        });
        //console.log(this.state.idclient);
        //console.log(e.target.name);
        this.props.facturer(e.target.id);
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
                                <td><button class="btn btn-success btn-sm" id={client.id} onClick={this.facturer}>Facturer</button></td>
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
