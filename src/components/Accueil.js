import React, {Component} from 'react'
import axios from 'axios'
import ImageDefault from "./default.png"
import fileloader from "file-loader"

class Accueil extends Component{
    constructor(props){
        super(props)
        this.state={
            liste : [],
            cnichanged : false,
            allowsubmit : false,
            description : "",
            cnibailleur : "",
            montantvoulu : "",
            prix : "",
            adresse : "",
            photo : "photo",
            nom : "",
            idbailleur : ""
        }

        this.listerBiens()
        this.handlePhoto = this.handlePhoto.bind(this)
        this.init = this.init.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.handleCniAndOnChange = this.handleCniAndOnChange.bind(this)
        this.handleAjoutBailleur = this.handleAjoutBailleur.bind(this)
        this.handleLocation = this.handleLocation.bind(this)
        this.handleLocationClient = this.handleLocationClient.bind(this)
        this.handleSubmitLocation = this.handleSubmitLocation.bind(this)
        this.verifCniClient2 = this.verifCniClient2.bind(this)
        this.handleAjoutClient = this.handleAjoutClient.bind(this)
        this.handleClient = this.handleClient.bind(this)
        this.handleDetailler = this.handleDetailler.bind(this)
    }

    handleGet = (e) => {
        axios.get("http://localhost:8080/M1GLImmo/immo")
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            }) 
    };

    listerBiens = () => {
        axios.get('http://localhost:8080/M1GLImmo/immo?action=listebiens')
            .then(response => {
                //console.log(response)

                this.setState({
                    liste : response.data
                })
                console.log(this.state.liste[1])
            })
            .catch(error => {

            })
    };

    init = () => {
        
        //const ele = document.getElementById('alertcni');
        //ele.hidden = "true";
        this.setState({
            cnichanged : false,
            allowsubmit : false,
            description : "",
            cnibailleur : "",
            montantvoulu : "",
            prix : "",
            adresse : "",
            photo : "photo",
            nom : "",
            idbailleur : ""
        })
    }

    handlePhoto = (e) => {
        //console.log(e.target.files[0]);
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        
        reader.onload = (e) => {
            console.log(e.target.result);
            let img = document.getElementById("image");
            img.src =  e.target.result
            this.setState({
                photo : files[0]
            })
        } 
    }

    /**
     * Verification CNI
     */
    handleCni = (e) => {
        let cni = e.target.value;
        //console.log(cni);
        //const ele = document.getElementById('alertcni');
        //ele.hidden = false;
        //ele.innerHTML("Aucune correspondance Ajoutez d'abord le bailleur");
        //ele.val('<p class="alert alert-warning" id="alertcni" >Aucune correspondance Ajoutez d\'abord le bailleur </p>');
        //this.setState({
        //    cnichanged : true
        //})

        //const btnsub = document.getElementById('ajouterbien')
        //btnsub.hidden = false

        axios.get('http://localhost:8080/M1GLImmo/immo?action=verifcnibailleur&cni='+cni)
            .then(response => {
                console.log(response)
                if(response.data.existe){
                    //6547654875
                    const ele = document.getElementById('alertcni');
                    ele.hidden = true;
                    const btnsub = document.getElementById('ajouterbien')
                    btnsub.hidden = false
                    this.setState({
                        idbailleur : response.data.id
                    })
                } else {
                    const ele = document.getElementById('alertcni');
                    ele.hidden = false;
                }
            })
            .catch(error => {
                const ele = document.getElementById('alertcni');
                ele.hidden = false;
            })
        
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    rend(){
        
    }

    handleCniAndOnChange = (e) => {
        this.handleCni(e);
        this.onChangeHandler(e);
    }

    handleAjoutBailleur = (e) => {
        axios.get("http://localhost:8080/M1GLImmo/immo?action=addbailleur&cni="+this.state.cnibailleur+"&nom="+this.state.nom)
            .then(response => {
                //console.log(response)
                if(response.data.added){
                    const ele = document.getElementById('alertcni');
                    ele.hidden = true;
                } else 
                this.setState({
                    cnibailleur : ""
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleAjoutBien = (e) => {
        e.preventDefault();
        // axios.get("http://localhost:8080/M1GLImmo/immo?action=addbien&description="+this.state.description
        //     +"&idbailleur="+this.state.idbailleur
        //     +"&montantvoulu="+this.state.montantvoulu
        //     +"&prixlocation="+this.state.prix
        //     +"&photo="+this.state.photo
        //     +"&adresse="+this.state.adresse
        //     )
        //     .then(response => {
        //         //console.log(response)
        //         if(response.data.reussi){
        //             console.log(response.data.reussi)
        //             this.listerBiens();
        //             this.init()
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        let formdata = new FormData();
        formdata.append("photo", this.state.photo);
        axios.post("http://localhost:8080/M1GLImmo/immo?action=addbien&description="+this.state.description
        +"&idbailleur="+this.state.idbailleur
        +"&montantvoulu="+this.state.montantvoulu
        +"&prixlocation="+this.state.prix
        +"&adresse="+this.state.adresse, formdata)
        .then(response => {
            console.log(response)
            if(response.data.reussi){
                console.log(response.data.reussi)
                this.listerBiens();
                this.init()
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleBailleur = (e) => {
        this.onChangeHandler(e)
        this.handleCniBailleur(e)
    }

    handleCniBailleur = (e) => {
        let cni = e.target.value;
        const ele = document.getElementById('cnibailleur');
        const btnAjoutBailleur = document.getElementById('btnajouterbailleur');

        btnAjoutBailleur.disabled = true;

        axios.get('http://localhost:8080/M1GLImmo/immo?action=verifcnibailleur&cni='+cni)
            .then(response => {
                //console.log(response)
                if(!response.data.existe){
                    btnAjoutBailleur.hidden = false;
                    ele.hidden = true;
                } else {
                    ele.hidden = false;
                    btnAjoutBailleur.hidden = true;
                }
            })
            .catch(error => {

            })
    }

    handleLocationClient = (e) => {
        
        this.onChangeHandler(e)
        this.handleLocation(e)
    }

    handleLocation = (e) => {
        let cni = e.target.value;
        const alertcniclient = document.getElementById('alertcniclient-'+this.state.idbien);
        const btnAjouterClient22 = document.getElementById('btnAjouterClient-'+this.state.idbien);
        btnAjouterClient22.hidden = true;

        axios.get('http://localhost:8080/M1GLImmo/immo?action=verifcniclient&cni='+cni)
            .then(response => {
                //console.log(response)
                if(response.data.existe){
                    //console.log("existe")
                    btnAjouterClient22.hidden = false;
                    alertcniclient.hidden = true;
                    this.setState({
                        idclient : response.data.id
                    })
                } else {
                    console.log("n'existe pas")
                    btnAjouterClient22.hidden = true;
                    alertcniclient.hidden = false;
                }
            })
            .catch(error => {

            })
    }

    handleSubmitLocation = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8080/M1GLImmo/immo?action=louer&idclient='+this.state.idclient+"&idbien="+this.state.idbien)
            .then(response => {
                console.log(response)
                if(response.data.added){
                    this.listerBiens();
                } else {

                }
            })
            .catch(error => {

            })
    }

    handleClient = (e) => {
        this.onChangeHandler(e);
        this.verifCniClient2(e);
        
    }

    verifCniClient2 = (e) => {
        let cni = e.target.value;
        const alertcniclient2 = document.getElementById('alertcniclient2');
        const btnajouterclient2 = document.getElementById('btnajouterclient2');

        axios.get('http://localhost:8080/M1GLImmo/immo?action=verifcniclient&cni='+cni)
            .then(response => {
                //console.log(response)
                if(!response.data.existe){
                    btnajouterclient2.hidden = false;
                    alertcniclient2.hidden = true;
                } else {
                    alertcniclient2.hidden = false;
                    btnajouterclient2.hidden = true;
                }
            })
            .catch(error => {

            })
    }

    handleLouerId = (e) => {
        this.setState({
            idbien : e.target.name
        })
    }

    handleAjoutClient = (e) => {
        axios.get("http://localhost:8080/M1GLImmo/immo?action=addclient&nom="
            +this.state.nomclient
            +"&cni="+this.state.cniclient
            )
            .then(response => {
                console.log(response)
                
            })
            .catch(error => {
                console.log(error)
            })
    }

    // style="background: rgba(255,255,255,0.5)"

    handleDetailler = (e) => {
        let id = e.target.name
        axios.get("http://localhost:8080/M1GLImmo/immo?action=getdetails&id="
            +id
            )
            .then(response => {
                console.log(response.data.photo)
                // let file = File(response.data.photo)
                // console.log(file)
                const testimage = document.getElementById("imagedetails")
                testimage.path= response.data.photo
                // let reader = new FileReader();
                // reader.readAsDataURL(response.data.photo);
                
                // reader.onload = (e) => {
                //     console.log(e.target.result);
                //     let img = document.getElementById("image");
                //     testimage.src =  e.target.result
                // }
                        
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div class="tableau">
                <h1>Liste des biens</h1>
                <div class="container">
                <table class="table table-bordered table-stripped" >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Montant Voulu</th>
                            <th>Prix Location</th>
                            <th>Disponibilité</th>
                            <th>Adresse</th>
                            <th>Louer</th> 
                            <th>Details</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.liste.map(listeBiens => <tr key={listeBiens.id}>
                                <td>{listeBiens.description}</td> <td>{listeBiens.montantvoulu}</td> <td>{listeBiens.prixlocation}</td>
                                <td>{listeBiens.disponibilite?"Disponible":"Occupé"}</td> <td>{listeBiens.adresse}</td>
                                <td><button class="btn btn-success btn-sm" disabled={listeBiens.disponibilite?false:true} data-toggle="modal" name={listeBiens.id} onClick={this.handleLouerId} data-target={"#modal-"+listeBiens.id}>Louer</button></td>
                                <td><button class="btn btn-success btn-sm" data-toggle="modal" data-target={"#details-"+listeBiens.id} name={listeBiens.id} onClick={this.handleDetailler} id="">Detailler</button></td>

                                <div class="modal modal-info fade" id={"modal-"+listeBiens.id}>
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Louer</h4>
                                            </div>
                                            <div class="modal-body">
                                                <form class="form-signin" onSubmit={this.handleSubmitLocation}>
                                                
                                                <input type="hidden" id="idbienlocation"  onChange={this.onChangeHandler} name="idbien" value={listeBiens.id} />
                                                    
                                                <div class="form-label-group">
                                                    <input type="number" id="cniclient" name="cniclient" class="form-control" onChange={this.handleLocationClient} placeholder="Entrez le CNI du client"  required autofocus />
                                                    <label for="inputEmail">CNI du client</label>
                                                    <p class="alert alert-warning" id={"alertcniclient-"+listeBiens.id} hidden="true" >Aucune correspondance Ajoutez d'abord le Client<button class="btn btn-pimary" data-dismiss="modal" data-toggle="modal" data-target="#ajouterclient" name="ajouterclient">Ajouter Client</button></p>
                                                </div>

                                                <div class="form-label-group">
                                                    <input type="text" name="etatbien" class="form-control" onChange={this.onChangeHandler} placeholder="Etat du bien" required />
                                                    <label for="inputEmail">Etat du Bien</label>
                                                </div>

                                                

                                                
                                                <button class="btn btn-lg btn-primary btn-block" data-dismiss="modal" id={"btnAjouterClient-"+listeBiens.id} onClick={this.handleSubmitLocation} type="submit">Louer</button>
                                                <button class="btn btn-warning btn-block" data-dismiss="modal">Annuler</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div class="modal modal-info fade" id={"details-"+listeBiens.id}>
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Details du bien</h4>
                                            </div>
                                            <div class="modal-body">
                                                <label>{"Description   : "+listeBiens.description} </label><br/>
                                                <label>{"Montant Voulu : "+listeBiens.montantvoulu} </label><br/>
                                                <label>{"Prix Location : "+listeBiens.prixlocation} </label><br/>
                                                <label>{"Disponibilite : "+(listeBiens.disponibilite?"Disponible":"Occupé")} </label><br/>
                                                <label>{"Adresse       : "+listeBiens.adresse} </label><br/>
                                                <label>Photo         : </label><br/><br/>
                                                <img id="imagedetails" alt="Sorry can't read the image!!" width="180px"  />
                                                <button class="btn btn-warning btn-block" data-dismiss="modal">Fermer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Description</th>
                            <th>Montant Voulu</th>
                            <th>Prix Location</th>
                            <th>Disponibilité</th>
                            <th>Adresse</th>
                            <th>Louer</th>   
                            <th>Details</th> 
                        </tr>
                    </tfoot>

                </table>
                </div>


                {
                    // Modal d'ajout d'un bien
                }
                <div class="modal modal-info fade" id="ajouter">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Ajout d'un Bien</h4>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.handleAjoutBien}>
                                <div class="form-label-group">
                                    <label for="inputEmail">Description du bien</label>
                                    <input type="text" id="inputEmail" name="description" class="form-control" placeholder="Description" onChange={this.onChangeHandler} required autofocus />
                                </div>
                                
                                <div class="form-label-group">
                                    <label for="inputEmail">CNI du Bailleur</label>
                                    <input type="number" id="inputEmail" name="cnibailleur" class="form-control" value={this.state.cnibailleur} placeholder="CNI" onChange={this.handleCniAndOnChange} required />
                                    <p class="alert alert-warning" id="alertcni" hidden="true" >Aucune correspondance Ajoutez d'abord le bailleur<button class="btn btn-pimary" data-dismiss="modal" data-toggle="modal" data-target="#ajouterbailleur" name="ajouterbailleur">Ajouter Bailleur</button></p>
                                </div>
                                
                                <div class="form-label-group">
                                    <label for="inputEmail">Montant voulu</label>
                                    <input type="number" id="inputEmail" name="montantvoulu" class="form-control" placeholder="Montant voulu" onChange={this.onChangeHandler} required />
                                </div>
                                
                                <div class="form-label-group">
                                    <label for="inputEmail">Prix de location</label>
                                    <input type="number" id="inputEmail" name="prix" class="form-control" placeholder="Prix de location" onChange={this.onChangeHandler}  required />
                                </div>
                                
                                <div class="form-label-group">
                                    <label for="inputEmail">Adresse</label>
                                    <input type="text" id="inputEmail" name="adresse" class="form-control" placeholder="Adresse"onChange={this.onChangeHandler}  required />
                                </div>
                                
                                <div class="form-label-group">
                                    <label for="inputEmail">Photo</label>
                                    <input type="file" id="photo" name="photo" src={ImageDefault} class="form-control" onChange={this.handlePhoto}  />
                                </div>

                                <div >
                                    <img  src={ImageDefault} alt="OOoops!!" id="image"  width="180px"  />
                                </div>

                                <button class="btn btn-success" data-dismiss="modal"  hidden="true" id="ajouterbien" onClick={this.handleAjoutBien}>Ajouter Bien</button>
                                
  
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    // Modal d'ajout d'un bailleur
                }
                <div class="modal modal-info fade" id="ajouterbailleur">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Ajout d'un Bailleur</h4>
                            </div>
                            <div class="modal-body">
                                <form>
                                
                                
                                <div class="form-label-group">
                                    <label for="inputEmail">Nom du Bailleur</label>
                                    <input type="text" id="inputEmail" name="nom" class="form-control" placeholder="Nom" onChange={this.onChangeHandler} required />
                                </div>
                                
                                <div class="form-label-group">
                                    <label for="inputEmail">CNI du bailleur</label>
                                    <input type="number" id="inputEmail" name="cnibailleur" class="form-control" placeholder="CNI" onChange={this.handleBailleur}  required />
                                    <p class="alert alert-warning" id="cnibailleur" hidden="true" >CNI deja existant</p>
                                </div>


                                <button class="btn btn-success" id="btnajouterbailleur" data-dismiss="modal" data-toggle="modal" data-target="#ajouter" onClick={this.handleAjoutBailleur}>Ajouter Bailleur</button>
                                <button class="btn btn-warning" data-dismiss="modal" data-target="#ajouter">Annuler</button>
  
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    /**
                     * Modal ajout Client
                     */
                }
                <div class="modal modal-info fade" id="ajouterclient">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Ajout d'un Client</h4>
                            </div>
                            <div class="modal-body">
                                <form  onSubmit={this.handleAjoutClient}>
                                
                                
                                <div class="form-label-group">
                                    <label for="inputEmail">Nom du Client</label>
                                    <input type="text" id="inputEmail" name="nomclient" class="form-control" placeholder="Nom" onChange={this.onChangeHandler} required />
                                </div>
                                
                                <div class="form-label-group">
                                    <label for="inputEmail">CNI du Client</label>
                                    <input type="number" id="inputEmail" name="cniclient" class="form-control" placeholder="CNI" onChange={this.handleClient}  required />
                                    <p class="alert alert-warning" id="alertcniclient2" hidden="true" >CNI deja existant</p>
                                </div>


                                <button class="btn btn-success" type="submit" id="btnajouterclient2" onClick={this.handleAjoutClient} data-dismiss="modal">Ajouter Client</button>
                                <button class="btn btn-warning" data-dismiss="modal" >Annuler</button>
  
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="btn btn-success" data-toggle="modal" data-target="#ajouter" onClick={this.init}>Ajouter un Bien</button>
            </div>
            
        )
    }
}

export default Accueil

