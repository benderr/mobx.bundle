export const getErrorClassName = ({error, touched}) => {
	return error && touched ? ' error ' : '';
};

export const getSuccessClassName = ({error, touched}) => {
	return !error && touched ? ' success ' : '';
};
