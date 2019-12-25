import React,{useReducer} from 'react';
import './App.css';

import TextField from './components/textField/';

function App() {

  const initDefaultValue = {
    password:'',
    username:''
  }


  const formReducer = (state,action) => {
    console.log(state,action)

    return {...state};
  }


  const [defaultValue,dispatch] = useReducer(formReducer,initDefaultValue)




  const handleChange = (name,e) => {
    console.log(name,e)
    dispatch(name,e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <main>

        <TextField
          name="password"
          type="text"
          value={defaultValue.password}
          helperText="test1"
          onChange={(name,e)=>{handleChange(name,e)}}
          required
        />

        <TextField
          name="username"
          type="text"
          value={defaultValue.username}
          helperText="test2"
          onChange={(name,e)=>{handleChange(name,e)}}
          required
        />

        <button>按钮</button>

      </main>
    </div>
  );
}

export default App;
