import React from 'react';


import withFormContext from './withFormContext';

const FormItem = (props) => {

    const { name, value, onChange,type, ...rest} = props;

    return (
      <input
        value={value || ''}
        type={type}
        onChange={(e) => onChange(name,e.target.value,e)}
        {...rest}
      />
    );
}

const TextField = withFormContext(FormItem)

export default TextField;