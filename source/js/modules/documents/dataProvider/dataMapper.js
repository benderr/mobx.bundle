export const toClientOrder = order => {
	if (order.beginDateTime)
		order.beginDateTime = new Date(order.beginDateTime);

	return order;
};