/**
 * Интерфейс для работы с фокусировкой объектов
 */
export default class IFocusableType {
	init(el) {
		throw "IFocusableType method @init not implemented";
	}

	setFocus() {
		throw "IFocusableType method @setFocus not implemented";
	}

	inFocus() {
		//optional method
	}
}