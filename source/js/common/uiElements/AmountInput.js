import React from 'react';
import accounting from 'accounting';

accounting.settings = {
	number: {
		decimal: ","
	}
};

/**
 * Отсекаем лишние символы после в дробной части, из 2.1121 -> 2.11
 * @param str
 * @param char
 * @returns {*}
 */
function trimValidLength(str, char) {
	let resultStr = str;
	let lengthAfterChar = 0;
	if (str.lastIndexOf(char) >= 0)
		lengthAfterChar = str.length - str.lastIndexOf(char) - 1; //без учета точки

	let trimLength = lengthAfterChar - 2; //сколько лишних символов нужно отрезать с конца
	if (trimLength > 0) {
		resultStr = str.substr(0, str.length - trimLength);
	}

	return resultStr;
}

function cleanValue(val, ignoreSpace = true) {
	let res = ignoreSpace ? val.replace(/[^0-9\.,]+/g, '') : val.replace(/[^0-9\., ]+/g, '');
	return res.replace(',', '.');
}

function format(val) {
	return accounting.formatNumber(parseFloat(cleanValue(val)), 2, " ");
}

function calculateStart(start, originValue, formattedValue) {
	const substr = originValue.substring(0, start).replace(/ /g, '');
	let regex = '^';

	for (let i = 0, len = substr.length; i < len; i++) {
		regex += substr[i] + ' {0,1}'
	}
	const match = new RegExp(regex).exec(formattedValue);
	return match && match[0].length || 0;
}

class AmountInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			viewValue: '',
			value: ''
		};
	}

	static defaultProps = {
		onChange: function (maskValue, value, event) {/*no-op*/
		}
	};

	setFocus() {
		this.el && this.el.focus();
	}

	componentDidMount() {
		if (this.props.value) {
			const {viewValue, value, startPos}=this.parseValue(this.props.value);
			this.setState({viewValue, value, startPos});
		}
	}

	componentWillReceiveProps(props) {
		if (props && props.value) {
			const {viewValue, value, startPos}=this.parseValue(props.value);
			this.setState({viewValue, value, startPos});
		}
	}

	handleKeyDown(e) {
		const el = this.el;
		let isDeleting = e.keyCode === 8;
		let value = (e.target.value || '');
		let prevCharValue = value[el.selectionStart - 1];

		let isDeletingWhiteSpace = false;
		if (isDeleting && el.selectionStart >= 2) {
			let prevSelectionStartChars = value.substring(0, el.selectionStart - 1);
			if (prevSelectionStartChars && /\w/.test(prevSelectionStartChars)) {
				isDeletingWhiteSpace = /\s/g.test(prevCharValue);
			}
		}

		let isDeletingDecimalSeparator = isDeleting && prevCharValue === ',';

		let startPos = null;
		if (isDeletingDecimalSeparator || isDeletingWhiteSpace) {
			e.preventDefault();
			startPos = el.selectionStart - 1;
		}

		this.setState({isDeleting, startPos}, () => {
			this.setSelectionRange(startPos);
		});
	}

	parseValue(val) {
		const el = this.el;
		if (val === undefined)
			val = '';

		if (!val.replace)
			val = val.toString();

		let isDeleting = this.state.isDeleting;

		let clean = cleanValue(val, false).replace('-', '');

		clean = trimValidLength(clean, '.');

		const formattedValue = format(clean);
		const value = parseFloat(cleanValue(formattedValue));

		let startPos = el.selectionStart;

		if (value && el && formattedValue.length != clean.length) {
			startPos = calculateStart(el.selectionStart, clean, formattedValue);
		}

		let viewValue = '';

		if (!value) {
			if (!(/^0[,.]?0*/.test(val))) {
				viewValue = '';
			} else {
				if (isDeleting) {
					if (val === '0' || val === '00')
						viewValue = '';
				}
				else {
					if (!val || val === '0' || parseFloat(val) == 0) {
						viewValue = '0,';
						startPos = 2;
					} else if (!val || val === '0,0') {
						viewValue = '0,0';
						startPos = 3;
					} else {
						viewValue = '';
					}
				}
			}
		} else {
			viewValue = formattedValue;
		}

		return {startPos, viewValue, value};
	}

	handleChange(event) {
		event.preventDefault();
		let val = event.target.value;
		const {viewValue, value, startPos}=this.parseValue(val);
		this.setState({viewValue, value, startPos}, () => {
			this.setSelectionRange(startPos);
			this.props.onChange(viewValue, value, event);
		});
	}

	setSelectionRange(startPos) {
		if ((startPos || startPos === 0) && this.el.selectionStart != startPos) {
			this.el.setSelectionRange(startPos, startPos);
		}
	}


	render() {
		const {onChange, onKeyDown, type, ...props}=this.props;

		return (
			<input
				{...props}
				ref={input => this.el = input}
				type={type || 'text'}
				value={this.state.viewValue}
				onKeyDown={::this.handleKeyDown}
				onChange={::this.handleChange}
			/>
		)
	}
}

export default AmountInput;