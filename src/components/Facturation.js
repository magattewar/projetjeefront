import React, {Component} from 'react';
import axios from 'axios';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    }, 
    ligne: {
        margin: 10,
        padding: 10,
        flexDirection: 'row'
    },
    footer: {
        textAlign: "right",
        fontSize : "5mm",
    },title: {
        textAlign : "center"
    }, sectionTotal : {
        margin: 10,
      padding: 10,
      flexGrow: 1,
      color : "red"

    }
  });

  axios.get("http://localhost:8080/M1GLImmo/immo?action=facturer&id=1")
  .then(response => {

  })
  .catch(error => {
      
  })
  

class Facturation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            prenom : "magatte",
            nom : "war",
            age : 25,
            date : "",
            cni : "",
            adresse : "",
            type : "mensualité"

         };
         //console.log("id : "+props.idclient);
         this.facture();
    }

    facture = (e) => {
        axios.get("http://localhost:8080/M1GLImmo/immo?action=facturer&id="+this.props.etat.idClient)
        .then(response => {
            // if(true){
            //     //console.log(response.data.montant);
            //     this.setState({ montant : response.data.montant,
            //     idClient : idc });
            //     console.log(this.state);
            //     this.props.facturer(this.state);
            // }
            //console.log(response);

            this.setState({
                nom : response.data.nom,
                type : response.data.type,
                montant : response.data.montant,
                cni : response.data.cni,
                date : response.data.dateFacturation,
                telephone : response.data.telephone
            })
            
        })
        .catch(error => {
            
        });
    }

    render() {
        return (
                
           
                <Document>
                <Page size="A4">
                    <View style={styles.page}>
                        <View style={styles.section}>
                            <Text>Jee IMMO</Text>
                            <Text>Dakar, Senegal</Text>
                            <Text>jeeimmo@gmail.com</Text>
                        </View>

                        <View style={styles.section}>
                            <Text>Nom : {this.props.nom}</Text>
                            <Text>Cni : {this.state.cni}</Text>
                            
                            <Text>Telephone : {this.state.telephone}</Text>
                        </View>
                    </View>
                
                    <View style={styles.title}>
                    <Text>Cumul de toutes les mensualités non payées.</Text>
                    </View>
                
                    <View style={styles.page}>
                        

                        <View style={styles.section}>
                            <Text>Type</Text>
                            <Text>{this.state.type}</Text>
                        </View>

                        <View style={styles.sectionTotal}>
                            <Text>Montant du</Text>
                            <Text>{this.state.montant}</Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text>Fait a dakar</Text>
                        <Text>{this.state.date}</Text>
                    </View>
                </Page>
                
            </Document>

            
        );
    }
}

export default Facturation;