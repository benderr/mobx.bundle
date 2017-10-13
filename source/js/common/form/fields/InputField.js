import React from 'react';
import {observer} from 'mobx-react';
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
  };

  setFocus() {
    this.input.focus();
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('TEST', nextProps.field.name, nextProps.field.autoFocus);
  //   if (!this.props.field.autoFocus && nextProps.field.autoFocus && this.input) {
  //     setTimeout(() => this.input.focus(), 0);
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.field.autoFocus == false
  //     && nextProps.field.autoFocus == true) {
  //     this.input.focus();
  //   }
  // }

  componentDidMount() {
    this.props.field.ref = this;
  }

  render() {

    const {type, placeholder, field, validator: {tooltip, addClassName}, className, disabled, readOnly, autoFocus} = this.props;
    const classNames = [className, addClassName].join(' ');

    // if (!this.props.field.autoFocus && nextProps.field.autoFocus && this.input) {
    //   setTimeout(() => this.input.focus(), 0);
    // }

    return (
      <input
        { ...field.bind({type, placeholder}) }
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

export default observer(radValidateHoc()(InputField));
