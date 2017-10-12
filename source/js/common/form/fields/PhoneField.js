// import React from 'react';
// import { observer } from 'mobx-react';
// import radValidateHoc from 'common/form/validationHelpers/radValidateHoc';
//
//
// const CustomPhoneInput = observer(({ field, placeholder = null, type }) => (
//   <PhoneInput { ...field.bind({ type, placeholder }) } ref={ input => field.set('options', input) } />
// ));
// export default observer(radValidateHoc()(CustomPhoneInput));

import React from 'react';
import { observer } from 'mobx-react';
import { PhoneInput } from 'modul-components';
import radValidateHoc from 'common/form/validationHelpers/radValidateHoc';

// import InputFocusable from 'common/form/validationHelpers/InputFocusable';

@observer
class PhoneField extends React.Component {

  static defaultProps = {
    disabled: false,
    readOnly: false,
    className: '',
    addClassName: '',
    maxLength: 255,
    type: 'text',
  }

  // constructor(props) {
  //   super(props);
  //   // this.focusator = new InputFocusable();
  // }

  setFocus() {
    this.input.setFocus();
  }

  componentDidMount() {
    this.props.field.ref = this;
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    console.log(nextProps);
  }

  render() {
    const { type, placeholder, field, validator: { tooltip, addClassName }, className, disabled, readOnly } = this.props;
    const classNames = [className, addClassName].join(' ');
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
