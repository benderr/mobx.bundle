import {createAction} from "infrastructure/helpers/actionHelpers";
import {createRequestTypes} from "infrastructure/helpers/actionHelpers";
import {error} from "../../../common/uiElements/Notify/actions";

// ENUMS
export const SALES_REPORT = createRequestTypes('REPORT.SALES_REPORT');
export const CHECK_EMAIL = 'REPORT.CHECK_EMAIL';


// ACTIONS
export const salesReport = {
	request: ({beginDate, endDate, fromEmail}) => createAction(SALES_REPORT.REQUEST, {beginDate, endDate, fromEmail}),
	success: (props) => createAction(SALES_REPORT.SUCCESS, {props}),
	failure: (error) => createAction(SALES_REPORT.FAILURE, {error})
};

export const onCheckForEMail = (val) => createAction(CHECK_EMAIL, {val});



// export const GET_MONEY = createRequestTypes("DOCUMENTS.GET_MONEY");
//
//
// export const getMoney = {
// 	request: (props) => createAction(GET_MONEY.REQUEST, {...props}),
// 	success: ({pos, totalCount, list, isFirst}) => createAction(GET_MONEY.SUCCESS, {
// 		pos,
// 		totalCount,
// 		list,
// 		isFirst
// 	}),
// 	failure: (error) => createAction(GET_MONEY.FAILURE, {error})
// };