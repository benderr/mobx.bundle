import {ReactTooltip} from 'modul-components';
import React from 'react';

/**
 * HOC для обертки над инпутами, чтобы получить необходимые методы подсветки ошибок и т.д.
 * getTooltipError - текст ошибки для тултипа
 * isError - флаг ошибки
 * isSuccess - флаг валидности поля
 * addClassName - css класс success|error
 * tooltip: tooltip - конфиг для тултипа, который внедреятся в <input/>
 *
 * tips - включены ли подскажи тултипа
 */
function radValidate({tips} = {tips: true}) {
  return (WrappedComponent) => {
    class radValidateTooltip extends React.Component {

      constructor(props, context) {
        super(props, context);
        this.validatorId = Math.floor(Math.random() * (999999999 - 100000000)) + 100000000;
        this.tooltipId = `tooltip_${ this.validatorId }`;
      }

      getError() {
        return this.props.field.error;
      }

      showTooltipError() {
        const {field: {hasError, touched, submitFailed}} = this.props;
        return hasError && (submitFailed || touched);
      }

      getTooltipProps() {
        const self = this;
        return {
          html: true,
          multiline: true,
          getContent: [::self.getError, 400],
          type: 'error',
          event: 'focus',
          eventOff: 'blur keydown',
          place: this.props.tipPlace || 'right',
          delayHide: 0,
          effect: 'solid',
          resizeHide: true,
        };
      }

      getTooltipConfig({id}) {
        return {
          'data-for': id,
          'data-tip': '',
        };
      }


      render() {
        const {field, hideTips = false, wrapperClassName = ''} = this.props;
        const {isValid, hasError, focused, touched, submitFailed}=field;

        const tooltip = this.getTooltipConfig({id: this.tooltipId});

        const highlightError = (!isValid || hasError) && (touched || submitFailed) && !focused;
        const highlightSuccess = (isValid || !hasError) && touched && !focused;
        const addClassName = `${ highlightError && 'error' } ${ highlightSuccess && 'success' }`;

        const validator = {
          error: hasError,
          isError: highlightError,
          isSuccess: highlightSuccess,
          addClassName,
          tooltip,
        };

        if (tips && !hideTips) {
          const showErrorMessage = this.showTooltipError();
          return (
            <div className={ wrapperClassName }>
              <WrappedComponent
                { ...this.props }
                validator={ validator }/>
              <ReactTooltip className={showErrorMessage ? '' : 'hidden'}
                            id={ this.tooltipId } { ...this.getTooltipProps() } />
            </div>
          );
        }
        return (<WrappedComponent
          { ...this.props }
          validator={ validator }/>);
      }
    }

    return radValidateTooltip;
  };
}

export default radValidate;
