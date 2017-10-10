import React from 'react';
import { observer } from 'mobx-react';
import { PhoneInput } from 'modul-components'
import radValidateHoc from 'common/form/validationHelpers/radValidateHoc';


const input = ({ field, placeholder = null, type }) => (
  <PhoneInput {...field.bind({ type, placeholder })} />
);
export default radValidateHoc(observer(input));

//   <div className='measure'>
//     <label
//       htmlFor={ field.id }>
//       {field.label}
//     </label>
//     <input
//       aria-describedby='name-desc'
//       { ...field.bind({ type, placeholder }) } />
//     <small className='f6 db red'>
//       {field.error}
//     </small>
//   </div>