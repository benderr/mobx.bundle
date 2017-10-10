import React from 'react';
import { observer } from 'mobx-react';
import radValidateHoc from 'common/form/validationHelpers/radValidateHoc';
import InputFocusable from 'common/form/validationHelpers/InputFocusable';

@observer
class InputField extends React.Component {

  constructor(props) {
    super(props);
    this.focusator = new InputFocusable();
  }

  static defaultProps = {
    disabled: false,
    readOnly: false,
    className: '',
    addClassName: '',
    maxLength: 255,
    type: 'text',
  };

  render() {
    const { type, placeholder, field, validator: { tooltip, addClassName }, className, disabled, readOnly } = this.props;
    const classNames = [className, addClassName].join(' ');
    return (
      <input
        { ...field.bind({ type, placeholder }) }
        ref={ input => this.focusator.init(input) }
        className={ classNames }
        placeholder={ placeholder }
        type={ type }
        disabled={ disabled }
        readOnly={ readOnly }
        { ...tooltip } />
    );
  }
}

export default observer(radValidateHoc()(observer(InputField)));
