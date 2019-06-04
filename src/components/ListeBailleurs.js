import React, {Component } from 'react';
import axios from 'axios';

class ListeBailleurs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            liste : []
         };
         this.listerBailleurs()
         this.handleReglement = this.handleReglement.bind(this)
    }

    listerBailleurs = () => {
        axios.get('http://localhost:8080/M1GLImmo/immo?action=listebailleurs')
            .then(response => {
                //console.log(response)

                this.setState({
                    liste : response.data
                })
            })
            .catch(error => {

            })
    };

    handleReglement = (e) => {
        //return confirm("Bouton de reglement Clique");
    }

    render() {
        return (
            <div class="tableau">
                <h1>Liste des Bailleurs</h1>
                <div class="container">
                <table class="table table-bordered table-stripped">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Nombre de Proprietes</th>
                            <th>Montant du</th>
                            <th>Mode de Paiement</th>
                            <th>Regler Dette</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.liste.map(bailleur => <tr key={bailleur.id}>
                                <td>{bailleur.nom}</td> <td>{bailleur.nombreproprietes}</td> <td>{bailleur.credit}</td>
                                <td>{bailleur.modepaiement}</td><td><button class="btn btn-success btn-sm" onClick={this.handleReglement}>Regler</button></td>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Nom</th>
                            <th>Nombre de Proprietes</th>
                            <th>Montant du</th>
                            <th>Mode de Paiement</th>
                            <th>Regler Dette</th>
                        </tr>
                    </tfoot>

                </table>
                </div>
            </div>
        );
    }
}

export default ListeBailleurs;