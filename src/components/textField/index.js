import React, { useState,useContext } from 'react';

const FormContext = React.createContext({
    values:{},
    helperText:{},
    onChange: () => {}
})

const Form = (props) => {
    const { children, values, helperText, onChange, ...rest} = props;

    const value = {
        values,
        helperText,
        onChange,
    }


    return (
        <FormContext.Provider value={value}>
            <form {...rest}>
                {children}
            </form>
        </FormContext.Provider>
    );
}



const withFormContext = (Component) => {
    return props => {
        const { name } = props;


        const { values,helperText,onChange } = useContext(FormContext);


        return (
            <Component 
                value={values[name]}
                helperText={helperText[name]}
                onChange={onChange}
                {...props}
            />
        )

    }
}



const FormItem = (props) => {

    const { name,value,helperText, onChange,type, ...rest} = props;


    return (
      <input
        value={value || ''}
        type={type}
        onChange={(e) => onChange(name,e)}
        {...rest}
      />
    );
}


const TextField = withFormContext(FormItem)



export default TextField;