import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from '../InputRender';

export default (type: 'text', ...props) => {
	return ( <Field component={InputRender} {...this.props}/>);
}