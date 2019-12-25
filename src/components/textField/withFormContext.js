
import React,{useContext, useCallback} from 'react';

import {FormContext} from './hanForm';

const withFormContext = (Component) => {
  return props => {

    const { name } = props;

    const { values, dispatch } = useContext(FormContext);

    const changeHandler = useCallback((name,value) => {

      dispatch({ type: 'values', name, value });

    },[dispatch]);

    return (
      <Component value={values[name]} onChange={changeHandler} {...props} />
    )
  }
}

export default withFormContext;