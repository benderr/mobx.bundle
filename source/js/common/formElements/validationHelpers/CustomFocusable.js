import IFocusableType from './IFocusableType';

export default class CustomFocusable extends IFocusableType {
	init(el) {
		this.focusableInput = el;
	}

	setFocus() {
		if (!this.focusableInput)
			throw 'focusableInput not init';
		if (!this.focusableInput.setFocus)
			throw 'focusableInput does not have method @setFocus';
		this.focusableInput.setFocus && this.focusableInput.setFocus();
	}
}