/**
 * Created by RobertSabiryanov on 24.05.17.
 */
export const toServer = (point) => {
	const result = {
		settings: {
			hardwareSettings: {
				printerSettings: {
					dataChannel: {rate: 115200},
					protocol: "dummy"
				}
			},
			checkSettings: {},
			egaisSettings: {
				kpp: point.settings.egaisSettings.kpp,
			},
			fiscalServiceEnabled: point.settings.fiscalServiceEnabled,
			defaultVatTag: point.settings.defaultVatTag
		},
		payments: {
			mock: {enabled: point.mock.enabled},
			payme: {enabled: false}
		},
		name: point.name,
		address: point.address,
		phone: point.phone,
		inn: point.inn,
		id: point.id
	};
	return result;
};