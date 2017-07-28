export const toClientOrder = order => {
	if (order.beginDateTime)
		order.beginDateTime = new Date(order.beginDateTime);

	return order;
};

export const toClientDocumentFromList = doc => {
	if (doc.checkoutDateTime)
		doc.checkoutDateTime = new Date(doc.checkoutDateTime);
	return doc;
};

export const toClientDocumentDetails = doc => {
	const item = {
		id: doc.id,
		remoteId: doc.remoteId,
		creationDateTime: doc.creationDateTime ? new Date(doc.creationDateTime) : doc.creationDateTime,
		docType: doc.docType,
		docSum: doc.docSum,
		docNum: doc.docNum,
		positions: (doc.positions || []).map((p, i) => mapDocumentPosition(p, i)),
		payments: doc.payments
	};

	if (doc.status) {
		item.status = 'FAILED';
		item.fnState = doc.status.fnState;
		item.fiscalInfo = mapFiscalInfo(doc.status.fiscalInfo);
		item.error = 'some error'; //doc.status.message;
	} else {
		item.status = 'UNKNOWN';
	}

	return item;
};

function mapDocumentPosition(position, i) {
	return {
		id: i + 1,
		name: position.name,
		price: position.price,
		quantity: position.quantity,
		vatTag: position.vatTag,
		barcode: position.barcode,
		sum: getSum(position.quantity, position.price),
		discSum: position.discSum
	};
}

function getSum(quantity, price) {
	return isValidNumber(quantity) && isValidNumber(price) ? quantity * price : 0;
}

function isValidNumber(num) {
	return num !== null && num !== '';
}

function mapFiscalInfo(info) {
	if (!info)
		return {
			shiftNumber: 123,
			checkNumber: 123,
			kktNumber: 'string',
			fnNumber: 'string',
			fnDocNumber: 123,
			fnDocMark: 123,
			date: 'string',
			sum: 123,
			checkType: 'string',
			qr: 'string'
		};
	return {
		shiftNumber: info.shiftNumber,
		checkNumber: info.checkNumber,
		kktNumber: info.kktNumber,
		fnNumber: info.fnNumber,
		fnDocNumber: info.fnDocNumber,
		fnDocMark: info.fnDocMark,
		date: info.date,
		sum: info.sum,
		checkType: info.checkType,
		qr: info.qr
	}
}
