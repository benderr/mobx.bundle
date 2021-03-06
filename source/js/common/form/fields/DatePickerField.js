import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { DatePicker } from 'modul-components';
import radValidateHoc from 'common/form/validationHelpers/radValidateHoc';

@observer
class DatePickerField extends React.Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    format: PropTypes.string,
    validator: PropTypes.object,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    lang: PropTypes.string,
    formatDate: PropTypes.string,
    formatTime: PropTypes.string,
    step: PropTypes.number,
    closeOnDateSelect: PropTypes.func,
    timepicker: PropTypes.bool,
    datepicker: PropTypes.bool,
    weeks: PropTypes.string,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    startDate: PropTypes.any,
    defaultDate: PropTypes.any,
    defaultTime: PropTypes.any,
    todayButton: PropTypes.bool,
    defaultSelect: PropTypes.bool,
    yearStart: PropTypes.number,
    yearEnd: PropTypes.number,
    disabledDates: PropTypes.array,
    allowDates: PropTypes.array,
    allowDateRe: PropTypes.string,
    disabledWeekDays: PropTypes.bool,
    id: PropTypes.string,
    inline: PropTypes.bool,
  };
  static defaultProps = {
    disabled: false,
    readOnly: false,
    className: '',
    maxLength: 255,
    type: 'text',
    defaultDate: new Date(),
  }

  setFocus() {
    this.input.setFocus();
  }

  componentDidMount() {
    this.props.field.ref = this;
  }

  render() {
    const { field, className, disabled, readOnly, validator, ...other } = this.props;
    const { tooltip, addClassName } = validator;
    const classNames = `${ className } ${ addClassName }`;
    return (
      <DatePicker
        { ...other }
        { ...field.bind({readOnly}) }
        className={classNames}
        ref={ input => this.input = input }
        disabled={ disabled }
        readOnly={ readOnly }
        { ...tooltip } />
    );
  }
}
export default observer(radValidateHoc()(DatePickerField));
