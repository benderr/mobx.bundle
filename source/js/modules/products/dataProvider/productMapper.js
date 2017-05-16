/**
 * Created by RobertSabiryanov on 14.05.17.
 */
export const toClient = (data) => {
	let productsList= data.data.map(item => {
		return {
			accountingQuantity: item.accountingQuantity,
			additionalPrices: item.additionalPrices,
			alcVolume: item.alcVolume,
			alcoholType: item.alcoholType,
			articul: item.articul,
			barcode: item.barсode,
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
			sellRestrictPeriods: item.sellRestrictPeriods,
			shortName: item.shortName,
			vatTag: item.vatTag,
			volume: item.volume
		}
	});
	return {pos: data.pos, totalCount: data.total_count, productsList};
}
