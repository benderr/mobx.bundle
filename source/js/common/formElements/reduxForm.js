import {reduxForm, focus} from 'redux-form/immutable'

/**
 * Обертка над reduxForm, для фокусировки при валидации
 * @param form
 * @param onSubmitFail
 * @param props
 * @returns {*}
 */
export default ({form, onSubmitFail, ...props}) => {
	return reduxForm({
		form: form,
		onSubmitFail: (errors, dispatch, ...props) => {
			if (errors) {
				const firstField = Object.keys(errors)[0];
				firstField && dispatch(focus(form, firstField));
			}
			if (onSubmitFail) {
				onSubmitFail(errors, dispatch, ...props);
			}
		},
		...props
	});
}