import React, {Component} from 'react'
import axios from 'axios'

class Connexion extends Component{

    constructor(props){
        super(props);
        this.state = {
            login : "",
            password : "",
            showPassword : false
        };
        /**
         * binding
         */
        this.seConnecter = this.seConnecter.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.showPassword = this.showPassword.bind(this);
    }

    seConnecter(event){
        event.preventDefault();
        
        axios.get('http://localhost:8080/M1GLImmo/immo?action=login&login=' + this.state.login + '&password=' + this.state.password)
            .then(response => {
                
                if(response.data.matched){
                    //console.log(response);
                    this.setState({ connected : true });
                    this.props.connecter(this.state);
                }
                    
            })
            .catch(error => {
                
            })
    }

    showPassword(e){
        if(e.target.checked){
            this.setState({
                showPassword : true
            })
        }
        else 
            this.setState({
                showPassword : false
            })
       
    }

    onChangeHandler(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    render(){
        return(
            <div class="row">
                
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <form class="form-signin" onSubmit={this.seConnecter}>
                <div class="text-center mb-4">
                    <img class="mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                    <h1 class="h3 mb-3 font-weight-normal">Connexion</h1>
                    </div>

                <div class="form-label-group">
                    <input type="text" id="inputEmail" name="login" class="form-control" placeholder="Login" onChange={this.onChangeHandler} required autofocus />
                    <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                    { this.state.showPassword ? <input type="text" id="inputPassword" name="password" class="form-control" placeholder="Password" onChange={this.onChangeHandler} required  /> :
                    <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" onChange={this.onChangeHandler} required /> }
                    <label for="inputPassword">Password</label>
                </div>

                <div class="checkbox mb-3">
                    <label>
                    <input onChange={this.showPassword} type="checkbox" value="show password" /> show password
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2019</p>
                </form>
            </div>
            <div class="col-sm-4"></div>
            </div>
        )
    }

}

export default Connexion
