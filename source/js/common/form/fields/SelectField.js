import React from 'react';
import { observer } from 'mobx-react';
import { Select } from 'modul-components';
import radValidateHoc from 'common/form/validationHelpers/radValidateHoc';

@observer
class InputField extends React.Component {

  static defaultProps = {
    disabled: false,
    readOnly: false,
    className: '',
    addClassName: '',
    maxLength: 255,
    type: 'text',
  }

  setFocus() {
    this.input.setFocus();
  }

  componentDidMount() {
    this.props.field.ref = this;
  }

  render() {
    const { type, placeholder, field, validator: { tooltip, addClassName }, className, disabled, readOnly } = this.props;
    const classNames = [className, addClassName].join(' ');
    return (
      <Select
        { ...field.bind({ type, placeholder }) }
        ref={ input => this.input = input }
        className={ classNames }
        placeholder={ placeholder }
        type={ type }
        disabled={ disabled }
        readOnly={ readOnly }
        { ...tooltip }
        { ...field.bind() }
        options={ field.extra } />
    );
  }
}

export default observer(radValidateHoc()(InputField));
