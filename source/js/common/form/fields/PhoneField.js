import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { PhoneInput } from 'modul-components';
import radValidateHoc from 'common/form/validationHelpers/radValidateHoc';


@observer
class PhoneField extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    validator: PropTypes.object,
    field: PropTypes.object,
  };
  static defaultProps = {
    disabled: false,
    readOnly: false,
    className: '',
    type: 'text',
  };

  componentDidMount() {
    this.props.field.ref = this;
  }

  setFocus() {
    this.input.setFocus();
  }

  render() {
    const { type, placeholder, field, className, disabled, readOnly } = this.props;
    const { tooltip, addClassName } = this.props.validator;
    const classNames = `${ className } ${ addClassName }`;

    return (
      <PhoneInput
        { ...field.bind({ type, placeholder }) }
        ref={ input => this.input = input }
        className={ classNames }
        placeholder={ placeholder }
        type={ type }
        disabled={ disabled }
        readOnly={ readOnly }
        { ...tooltip } />
    );
  }
}

export default observer(radValidateHoc()(PhoneField));
