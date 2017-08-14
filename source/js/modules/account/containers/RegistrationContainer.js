import React from 'react';
import RegistrationForm from '../components/RegistrationForm'
import {connect} from 'react-redux';
import {register, registerReset} from '../actions/accountActions'
import {bindActionCreators} from 'redux';
import {getRegistrationSection} from '../selectors/accountSelectors'
import toJs from 'components/HOC/toJs';
import {Link} from 'react-router-dom';
import ModulHeader from 'components/ModulHeader';
import {formValueSelector} from 'redux-form/immutable'
import {ContentPopupService} from 'common/uiElements';

class RegistrationContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			captcha: null,
			captchaReady: false,
			formInitialValues: {agreement: true}
		};
	}

	componentDidMount() {
		this.props.registerReset();
	}

	onCaptchaChange(value) {
		this.setState({
			captcha: value
		});
	}

	onCaptchaLoad() {
		this.setState({
			captchaReady: true
		});
	}

	onRegister(props) {
		if (!this.state.captcha)
			return;
		const {register}=this.props;
		const user = {
			name: props.get('name'),
			surname: props.get('surname'),
			company: props.get('company'),
			phone: props.get('phone'),
			email: props.get('email'),
			password: props.get('password'),
			captcha: this.state.captcha
		};
		register(user);
	}

	handleOpenAgreement() {
		this.agreementPopup && this.agreementPopup.open();
	}

	render() {
		const {loading, errors, regData, agreementSelected}=this.props;

		return (
			<div class="login reg">
				<ModulHeader/>
				<div className="login_section">
					<div className="login_section_center">
						<RegistrationForm onRegister={::this.onRegister}
										  initialValues={this.state.formInitialValues}
										  errors={errors}
										  loading={loading}
										  regData={regData}
										  agreementSelected={agreementSelected}
										  captcha={this.state.captcha}
										  captchaReady={this.state.captchaReady}
										  onCaptchaChange={::this.onCaptchaChange}
										  onCaptchaLoad={::this.onCaptchaLoad}
										  onOpenAgreement={::this.handleOpenAgreement}/>
						<div className="login_links">
							<Link to="/signin">Войти</Link>
							<Link to="/forgot">Забыли пароль?</Link>
						</div>
					</div>
					<ContentPopupService closeName="Закрыть" ref={p => this.agreementPopup = p}>
						<h1>Пользовательское соглашение на обработку персональных данных</h1>
						<div>
							<p>В&nbsp;целях регистрации на&nbsp;сайте ООО &laquo;Аванпост&raquo;, расположенного
								по&nbsp;адресу в&nbsp;сети интернет:
								www.modulkassa.ru (ОГРН 1155476129753&nbsp;ИНН 5403011237, КПП 540301001;
								Местонахождение:
								630033, г. Новосибирск, ул. Тюменская, д.2, комната &#8470;&nbsp;315), а&nbsp;также
								в&nbsp;целях заключения
								Лицензионного договора на&nbsp;право использования программы
								для ЭВМ &laquo;Автоматизированное
								рабочее место кассира МодульКасса&raquo;, Клиент/Уполномоченный
								представитель Клиента, заполняя форму регистрации на&nbsp;сайте и&nbsp;передавая
								Персональные данные
								ООО &laquo;Аванпост&raquo;, прямо и&nbsp;однозначно заявляет следующее:</p>

							<p>2.1. Передаю ООО &laquo;Аванпост&raquo; свои Персональные данные и&nbsp;выражаю согласие
								на&nbsp;обработку с
								использованием средств автоматизации или без использования таких средств (включая сбор,
								запись, систематизацию, накопление, хранение, уточнение (обновление, изменение),
								извлечение,
								использование, передачу (распространение, предоставление, доступ), обезличивание,
								блокирование, удаление, уничтожение) своих Персональных данных, включая, но&nbsp;не
								ограничиваясь: паспортные данные, ФИО, место жительства, дата
								рождения, номер мобильного/городского телефона, иные сведения, а&nbsp;также
								осуществление
								любых
								иных действий с&nbsp;предоставляемыми Персональными данными с&nbsp;учетом действующего
								законодательства.</p>

							<p>2.2. Выражаю согласие на&nbsp;передачу ООО &laquo;Аванпост&raquo; своих Персональных
								данных для достижения
								целей, установленных Лицензионным договором на&nbsp;право использования программы для
								ЭВМ
								&laquo;Автоматизированное рабочее место кассира МодульКасса&raquo; (далее&nbsp;&mdash;
								Лицензионный договор), а
								также в&nbsp;целях использования личного кабинета Клиента на&nbsp;сайте ООО
								&laquo;Аванпост&raquo; www.modulkassa.ru и&nbsp;получения Клиентом услуг и&nbsp;сервисов
								посредством личного кабинета Клиента, третьим лицам (в&nbsp;том числе, Акционерному
								Обществу Коммерческий Банк &laquo;Модульбанк&raquo;, в&nbsp;случаях, когда такая
								передача требуется для достижения
								целей Лицензионного договора), в&nbsp;частности, при привлечении ООО
								&laquo;Аванпост&raquo; третьих лиц в
								целях надлежащего исполнения обязательств ООО. </p>
						</div>
					</ContentPopupService>
				</div>
			</div>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(RegistrationContainer));

const regForm = formValueSelector('register');

function mapStateToProps(state, ownProps) {
	let regSection = getRegistrationSection(state);
	return {
		loading: regSection.get('loading'),
		errors: regSection.get('error'),
		regData: regSection.get('success'),
		agreementSelected: regForm(state, 'agreement')
	}
}

function mapDispatchToProps(dispatch) {
	return {
		register: bindActionCreators(register.request, dispatch),
		registerReset: bindActionCreators(registerReset, dispatch)
	}
}