export const toClientProduct = (item) => {
	function getModifiers(modifiers) {
		modifiers = getWithId(modifiers);
		modifiers.forEach((group, i) => {
			group.modifiers = getWithId(group.modifiers);
		});
		return modifiers;
	}

	return {
		accountingQuantity: item.accountingQuantity,
		additionalPrices: item.additionalPrices,
		alcVolume: item.alcVolume,
		alcoholType: item.alcoholType,
		articul: item.articul,
		barcode: item.barсode || item.inventCode,
		barcodes: item.barcodes,
		defaultQuantity: item.defaultQuantity,
		deptCode: item.deptCode,
		extendedOptions: item.extendedOptions,
		groupId: item.groupId,
		inventCode: item.inventCode,
		inventGroup: item.inventGroup,
		isService: item.isService,
		measure: item.measure,
		minPrice: item.minPrice,
		name: item.name,
		optionalModifiers: item.optionalModifiers,
		optionalNoModifiers: item.optionalNoModifiers,
		options: item.options,
		packCapacity: item.packCapacity,
		packingMode: item.packingMode,
		price: item.price,
		printText: item.printText,
		productVCode: item.productVCode,
		remainDate: item.remainDate,
		remainInStock: item.remainInStock,
		requiredModifiers: item.requiredModifiers,
		modifiers: getModifiers(item.requiredModifiers),//todo выпилить
		sellRestrictPeriods: item.sellRestrictPeriods,
		shortName: item.shortName,
		vatTag: item.vatTag,
		volume: item.volume,
		catalogType: item.catalogType || ''
	}
};

export const toClient = (data) => {
	let productsList = data.data.map(toClientProduct);
	return {pos: data.pos, totalCount: data.total_count, productsList};
};

function getWithId(collection) {
	let arr = (collection || []);
	arr.forEach((item, i) => {
		item.id = i + 1;
	});
	return arr;
}
