export default (api) => {
	api.v1().retailpoint().addResource('catalog');
	api.v1().retailpoint().catalog().addResource('inventory','INVENTORY');
	api.v1().retailpoint().catalog().addResource('modifierGroups','MODIFIER_GROUP');
	api.v1().addResource('uploadCatalog', 'upload-catalog');
};
