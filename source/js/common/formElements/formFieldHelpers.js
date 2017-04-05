export const ifCondition = (condition, value, defaultVal = '') => {
	return condition ? value : defaultVal;
};

/**
 * Подсветка бордера инпута
 * @param error - есть ошибка
 * @param valid - валидное состояние
 * @param active - фокус в поле
 * @param visited - поле было под фокусом
 * @param submitFailed - не удачная отправка формы
 * @returns {*}
 */
export const showErrorBorder = ({valid, error, active, visited, submitFailed}) => {
	return (!valid || error) && (visited || submitFailed) && !active;
};

/**
 * Подсветка бордера инпута
 * @param error - есть ошибка
 * @param visited - поле было в фокусе
 * @param valid - валидное состояние
 * @param active - фокус в поле
 * @returns {*}
 */
export const showSuccessBorder = ({valid, visited, error, active}) => {
	return (valid || !error) && visited && !active;
};

/**
 * Показывать тултип с ошибкой
 */
export const getErrorMessage = ({error, touched, active, submitFailed}) => {
	return error && active && (submitFailed || touched) ? error : null;
};

