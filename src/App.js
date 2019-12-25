import React from 'react';
import './App.css';


import HanForm from './components/textField/hanForm';
import TextField from './components/textField/';

function App() {

  const initDefaultValue = {
    password:'1',
    username:'2',
    helperText:'test'
  }

  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <main>


        <HanForm
          values={initDefaultValue}>
        
        <TextField
          name="password"
          type="text"
          required
        />

        <TextField
          name="username"
          type="text"
          required
        />
        
        
        </HanForm>

        

        <button>按钮</button>

      </main>
    </div>
  );
}

export default App;
