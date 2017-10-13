import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

function inputFieldHoc({ tips } = { tips: true }) {
  return (FieldComponent) => {
    @observer
    class FieldComponentWrapper extends React.Component {
      static propTypes = {
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        className: PropTypes.string,
        addClassName: PropTypes.string,
        maxLength: PropTypes.number,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        field: PropTypes.object,
        validator: PropTypes.object,
      };
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
        const { type, placeholder, field, className, disabled, readOnly } = this.props;
        const { tooltip, addClassName } = this.props.validator;
        const classNames = `${ className } ${ addClassName }`;
        return (
          <FieldComponent
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
    return FieldComponentWrapper;
  };
}

export default inputFieldHoc;

