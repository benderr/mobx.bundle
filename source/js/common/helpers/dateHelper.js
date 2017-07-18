const isString = (value) => {
	if (typeof value == 'string' || value instanceof String) return true;
	return false
};

export default {

	currentLocal: 'ru',

	masks: {
		"default": "dd mmm yyyy",
		"default:R": "dd mmmm:R yyyy",
		"default:RC": "dd mmmm:R yyyy:C",
		"default:I": "dd mmmm:I yyyy",
		"defaultshortday": "d mmm yyyy",
		shortDate: "m/d/yy",
		mediumDate: "mmm d, yyyy",
		longDate: "mmmm d, yyyy",
		fullDate: "dddd, mmmm d, yyyy",
		shortTime: "h:MM TT",
		mediumTime: "h:MM:ss TT",
		longTime: "h:MM:ss TT Z",
		isoDate: "yyyy-mm-dd",
		isoTime: "HH:MM:ss",
		isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
		isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
		time: "HH:MM",
		clever: "clever",
		cleverDate: 'cleverDate',
		dateTime: 'dd.mm.yyyy HH:MM'
	},

	i18n: {
		'ru': {
			dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
			monthName: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
			yesterday: 'Вчера',
			today: 'Сегодня',
			dateSeparator: '.'
		}
	},


	monthDeclinationRu(month){
		return (month == 3 || month == 8) ? this.i18n.ru.monthName[month - 1] + 'а' : this.i18n[this.currentLocal].monthName[month - 1].slice(0, -1) + 'я';
	},

	monthDeclinationRuPredlojniy(month){
		return (month == 3 || month == 8) ? this.i18n.ru.monthName[month - 1] + 'е' : this.i18n[this.currentLocal].monthName[month - 1].slice(0, -1) + 'е';
	},

	getDayName(day, countChar){
		var dayName = this.i18n[this.currentLocal].dayNames[day];
		if (countChar && countChar > 0) {
			return dayName.substring(0, 3);
		}
		return dayName;
	},

	getMonthName(monthNumber, declination, countChar){
		var monthName = declination ? this.monthDeclinationRu(monthNumber) : this.i18n.ru.monthName[monthNumber - 1];
		if (!countChar && countChar > 0) {
			return monthName.substring(0, 3);
		}
		return monthName;
	},

	getCurrentWeekDates(date){
		var now = date;
		var start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		var delta = start.getDay() > 0 ? 1 : -6;
		start.setDate(start.getDate() - start.getDay() + delta);
		var stop = new Date(start);
		stop.setDate(stop.getDate() + 6);

		return {
			startDate: start,
			stopDate: stop
		}
	},

	getLastWeekDates(date){
		var now = date;
		var start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		var delta = start.getDay() > 0 ? 1 : -6;
		start.setDate(start.getDate() - start.getDay() + delta - 7);
		var stop = new Date(start);
		stop.setDate(stop.getDate() + 6);

		return {
			startDate: start,
			stopDate: stop
		}
	},

	getCurrentMonthDates(date){
		var now = date;
		var start = new Date(now.getFullYear(), now.getMonth(), 1);
		var stop = new Date(now.getFullYear(), now.getMonth(), this.daysInMonth(now));

		return {
			startDate: start,
			stopDate: stop
		}
	},

	getLastMonthDates(date){
		var now = date;
		var start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		var firstDayInlastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		var stop = new Date(now.getFullYear(), now.getMonth() - 1, this.daysInMonth(firstDayInlastMonthDate));

		return {
			startDate: start,
			stopDate: stop
		}
	},

	getCurrentQuarterDates(date){
		var now = date,
			start = '',
			stop = '';

		switch (now.getMonth()) {
			case 0:
			case 1:
			case 2:
				start = new Date(now.getFullYear(), 0, 1);
				stop = new Date(now.getFullYear(), 2, 31);
				break;
			case 3:
			case 4:
			case 5:
				start = new Date(now.getFullYear(), 3, 1);
				stop = new Date(now.getFullYear(), 5, 30);
				break;
			case 6:
			case 7:
			case 8:
				start = new Date(now.getFullYear(), 6, 1);
				stop = new Date(now.getFullYear(), 8, 30);
				break;
			case 9:
			case 10:
			case 11:
				start = new Date(now.getFullYear(), 9, 1);
				stop = new Date(now.getFullYear(), 11, 31);
				break;
		}

		return {
			startDate: start,
			stopDate: stop
		}
	},

	getLast30DaysDates(date){
		var now = date;
		var start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		start.setDate(start.getDate() - 30);
		var stop = new Date(now.getFullYear(), now.getMonth(), now.getDate());

		return {
			startDate: start,
			stopDate: stop
		}
	},

	getCurrentYearDates(date){
		var now = date;
		var start = new Date(now.getFullYear(), 0, 1);
		var stop = new Date(now.getFullYear(), 11, 31);

		return {
			startDate: start,
			stopDate: stop
		}
	},

	countCalendarDayBetween(date1, date2){
		function createOnlyDate(date) {
			var d = new Date(date.getTime());
			d.setHours(0, 0, 0, 0);
			return d;
		}

		var _date1 = createOnlyDate(date1);
		var _date2 = createOnlyDate(date2);

		var dayCount = (_date1.getTime() - _date2.getTime()) / (24 * 60 * 60 * 1000);
		return Math.abs(dayCount);
	},

	isYesterday(now, date){
		return now > date && this.countCalendarDayBetween(now, date) == 1;
	},

	countHourBetween(date1, date2){
		return (date1 - date2) / (1000 * 60 * 60);
	},

	isValidDate(date){
		if (Object.prototype.toString.call(date) === "[object Date]") {
			if (isNaN(date.getTime())) {
				return false;
			}
			else {
				return true;
			}
		}
		else {
			return false;
		}
	},

	dateFormat(date, format, alternativeFormat, dateTimeNow){
		var mask;
		var prefix = '';
		var token = /d{1,4}(?::?[C]?)|m{1,4}(?::?[IRCP]?)|yy(?:yy|y)?(?::?[IRC]?)|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
			timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
			timezoneClip = /[^-+\dA-Z]/g,
			pad = function (val, len) {
				val = String(val);
				len = len || 2;
				while (val.length < len) val = "0" + val;
				return val;
			};


		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date();
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(this.masks[format] || format || this.masks["default"]);

		// Allow setting the utc argument via the mask
		var utc = false;
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var now = dateTimeNow ? dateTimeNow : new Date();
		var currentYear = now.getFullYear(),
			currentMonth = now.getMonth(),
			currentDate = now.getDate(),
			yesterday = this.i18n[this.currentLocal].yesterday,
			//isYesterday = this.countCalendarDayBetween(now, date) == 1 && now > date;
			isYesterday = this.isYesterday(now, date);


		var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			isCurrentYear = y == currentYear,
			isCurrentMonth = (y == currentYear) && (m == currentMonth),
			isCurrentDay = (y == currentYear) && (m == currentMonth) && (d == currentDate),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d: d,
				dd: pad(d),
				//'dd:C':isYesterday?yesterday:(isCurrentDay?'': pad(d)),
				ddd: this.getDayName(D, 3),
				dddd: this.getDayName(D),
				m: m + 1,
				mm: pad(m + 1),
				mmm: this.getMonthName(m + 1, false, 3),
				mmmm: this.getMonthName(m + 1, false),
				'mmmm:I': this.getMonthName(m + 1, false, 0),
				'mmmm:R': this.getMonthName(m + 1, true, 0),
				'mmmm:P': this.monthDeclinationRuPredlojniy(m + 1),
				'mm:C': isYesterday || isCurrentDay ? '' : pad(m + 1),
				'yy:C': !isCurrentYear ? String(y).slice(2) : "",
				yy: String(y).slice(2),
				'yyyy:C': !isCurrentYear ? y : "",
				yyyy: y,
				yyy: y,
				h: H % 12 || 12,
				hh: pad(H % 12 || 12),
				H: H,
				HH: pad(H),
				M: M,
				MM: pad(M),
				s: s,
				ss: pad(s),
				l: pad(L, 3),
				L: pad(L > 99 ? Math.round(L / 10) : L),
				t: H < 12 ? "a" : "p",
				tt: H < 12 ? "am" : "pm",
				T: H < 12 ? "A" : "P",
				TT: H < 12 ? "AM" : "PM",
				Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		var separator;


		if (format == 'clever') {
			separator = this.i18n[this.currentLocal].dateSeparator;
			mask = alternativeFormat ? alternativeFormat : "dd" + separator + 'mm' + separator + 'yyyy:C' + ' HH:MM';
			if (isCurrentYear) {
				mask = "dd" + separator + 'mm' + ' HH:MM';
			}
			if (isCurrentDay) {
				mask = "HH:MM"
			}
			if (isYesterday) {
				mask = yesterday + ", HH:MM"
			}
		}

		if (format == 'cleverDate') {
			separator = this.i18n[this.currentLocal].dateSeparator;
			mask = alternativeFormat ? alternativeFormat : "dd" + separator + 'mm' + separator + 'yyyy:C';
			if (isCurrentYear) {
				mask = alternativeFormat ? alternativeFormat : "dd" + separator + 'mm';
			}
			if (isCurrentDay) {
				return this.i18n[this.currentLocal].today;
			}
			if (isYesterday) {
				return this.i18n[this.currentLocal].yesterday;
			}
		}

		if (format == 'transaction') {
			mask = 'd mmmm:R yyyy';

			if (isCurrentYear) {
				mask = 'dd mmmm:R';
			}
			if (isCurrentDay) {
				prefix = this.i18n[this.currentLocal].today + ', ';
				mask = 'HH:MM';
			}
			if (isYesterday) {
				prefix = this.i18n[this.currentLocal].yesterday + ', ';
				mask = 'HH:MM';
			}
		}

		if (format == 'full') {
			mask = 'd mmmm:R yyyy';

			if (isCurrentYear) {
				mask = 'dd mmmm:R, HH:MM';
			}
			if (isCurrentDay) {
				prefix = this.i18n[this.currentLocal].today + ', ';
				mask = 'HH:MM';
			}
			if (isYesterday) {
				prefix = this.i18n[this.currentLocal].yesterday + ', ';
				mask = 'HH:MM';
			}
		}

		var parsedDate = mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});

		return prefix + parsedDate;
	},

	stringToDate(dateString){
		if (!isString(dateString)) {
			return undefined;
		}

		var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)*\.*\d*(Z)?\s*$/;

		var date = new Date(NaN), month,
			parts = isoExp.exec(dateString);
		if (parts) {
			date = parts[parts.length - 1] == 'Z' ? new Date(Date.UTC(parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6])) : new Date(parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6]);
		}
		return date;
	},


	daysInMonth(date){
		return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate(); //такой вот хак для вычисления количества дней в месяце
	}

}