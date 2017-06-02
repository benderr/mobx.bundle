import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from '../InputRender';

export default ({type = 'text', component, ...props}) => {
	return ( <Field type={type} component={InputRender} {...props}/>);
}