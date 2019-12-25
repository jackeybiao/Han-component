
import React, { useReducer } from 'react';



export const initialState = {
  values: {},
};

export function formState(state, action) {
  const { type, name, value, data } = action;

  if (data) {
    return Object.assign({}, state, {
      [type]: data,
    });
  }

  Object.assign(state[type], {
    [name]: value,
  });

  return { ...state };
}



export const FormContext = React.createContext({
  defaultValues:{},
  onChange: () => {}
})



const HanForm = (props) => {

  const { children, defaultValues, onChange, ...rest} = props;

  if (defaultValues) {
    Object.keys(defaultValues).forEach(item => {
      if (initialState.values[item] === undefined) {
        initialState.values[item] = defaultValues[item];
      }
    });
  }

  const [state, dispatch] = useReducer(formState, initialState);

  const { values } = state;

  const formContext = {
    values,
    dispatch,
    onChange,
  };

  return (
      <FormContext.Provider value={formContext}>
          <form {...rest}>
              {children}
          </form>
      </FormContext.Provider>
  );
}


export default HanForm;
