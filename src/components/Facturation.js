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
      flexGrow: 1
    }, 
    ligne: {
        margin: 10,
        padding: 10,
        flexDirection: 'row'
    },
    footer: {
        textAlign: "right",
        color : "blue",
        fontSize : "5mm",
        border : "0.05in"
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
                            <Text>le jj/mm/aaaa</Text>
                        </View>

                        <View style={styles.section}>
                            <Text>nom : {this.props.etat.nom}</Text>
                            <Text>cni : 2431456347657</Text>
                            <Text>id : {this.props.idclient}</Text>
                        </View>
                    </View>
                
                
                    <View style={styles.page}>
                        <View style={styles.section}>
                            <Text>date</Text>
                            <Text>le jj//mm//aaa</Text>
                        </View>

                        <View style={styles.section}>
                            <Text>Type</Text>
                            <Text>{this.state.type}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text>Montant du</Text>
                            <Text>3214554326</Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text>Fait a dakar</Text>
                        <Text>jj//mm//aaaa</Text>
                    </View>
                </Page>
                
            </Document>

            
        );
    }
}

export default Facturation;