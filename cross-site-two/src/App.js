import React, { Component } from 'react';
import logo from './logo.svg';
import { CrossStorageClient } from 'cross-storage'
import createGuest from 'cross-domain-storage/guest'
import './App.css';

const source = 'https://domain1.netlify.com';
const sourceTarget = `${source}/`;
console.log('sourceTarget', sourceTarget);
const storage = new CrossStorageClient(sourceTarget);



class App extends Component {
  constructor(){
    super()
    this.state = {
      loginCred : '',
      isloading: true
    }
  }
  componentDidMount() {
    console.log('storage', storage);
    storage.onConnect().then(() =>  {
      return storage.get('loginCred');
    }).then((res) =>  {
      console.log('res', res);
      this.setState({loginCred: res, isloading: false});

    }).catch((err) => {
      // Handle error
      this.setState({isloading: false});
      console.log('err', err)
    });

    // window.storage = storage;

  }

  render() {
    let  name, password = '';
    if(!!this.state.loginCred){
      const loginCred = JSON.parse(this.state.loginCred);
      name = loginCred.name;
      password = loginCred.password;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Site two - client
          </p>
          {!this.state.isloading &&
          (<div>
          {(!!name && !!password) ?
              <h1 style={{color: 'yellow'}}> Welcome {name}, Have a nice day</h1> : <h1 style={{color: 'red'}}> Please Login</h1>}
          </div>)}
        </header>
      </div>
    );
  }
}

export default App;
