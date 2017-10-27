import React from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';

class CheckboxField extends React.Component {
  static propTypes = {
    placeholder: PropTypes.string,
    field: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.inputId = Math.random().toString(36).substring(7);
  }
  render() {
    const {placeholder, field} = this.props;
    return (
      <div>
        <InputField hideTips={true} id={this.inputId} type='checkbox' field={field} />
        <label for={this.inputId} className='label_check'>
          <i className='icon' />
          <span className='f_small'>{placeholder}</span>
        </label>
      </div>
    );
  }
}

export default CheckboxField;
