import React, { Component } from 'react';
import logo from './logo.svg';
import { CrossStorageHub } from 'cross-storage'
import { CrossStorageClient } from 'cross-storage'
import createHost from 'cross-domain-storage/host'
import './App.css';

CrossStorageHub.init([
  {origin: /domain1.netlify.com/, allow: ['get', 'set']},
  {origin: /domain2.netlify.com/, allow: ['get']},
  {origin: /127.0.0.1/, allow: ['get']},
  {origin: /localhost/, allow: ['get']}
]);



console.log('CrossStorageHub init');
class App extends Component {
  constructor(){
    super()
    this.state = {
      name : '',
      password : ''
    }
    this.setValue = this.setValue.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.removeValue = this.removeValue.bind(this);
  }

  setValue(){
    const object = {
      name : this.state.name,
      password: this.state.password,
      clicked: false
    };
    localStorage.setItem("loginCred",JSON.stringify(object));
    this.setState({clicked: true});
  }

  removeValue(){
    localStorage.setItem("loginCred",'');
    this.setState({clicked: false});
  }

  nameChange(event){
    this.setState({name: event.target.value});
  }
  passwordChange(event){
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Site one - host
          </p>
          <input type="text" value={this.state.name} onChange={this.nameChange} placeholder="name"/> <br/>
          <input type="password" value={this.state.password} onChange={this.passwordChange} placeholder="password"/> <br/>
          <div>
            <button onClick={this.setValue}>Login</button> &nbsp;
            <button onClick={this.removeValue}>Logout</button>
          </div>
          {this.state.clicked && <h1 style={{color:'yellow'}}>Welcome {this.state.name} </h1>}
        </header>
      </div>
    );
  }
}

export default App;
