import React from 'react';
import ExternalLayout from 'views/Base/ExternalLayout'
const SignInComponent = props => {
    return (
        <ExternalLayout>
            <div className="wrap login">
                <div className="reg_header">
                    <a href="/" className="logo">МодульБанк</a>
                    <div className="title">Вход в систему</div>
                </div>
                <div className="reg_section">

                    <div className="reg_article">
                        <div className="form">
                            <div className="form_group">
                                <div className="input_group column twelve">
                                    <div className="input_group_addon addon_code big">+7</div>
                                    <input type="tel" name="phone" placeholder="Телефон *" id="phone" className="big"
                                           required/>
                                </div>
                            </div>
                            <div className="form_group">
                                <div className="input_group column twelve">
                                    <div className="input_group_addon icon-password big"></div>
                                    <input type="password" name="" value="" placeholder="Пароль" className="big"/>
                                </div>
                            </div>

                            {/*<!-- СМС -->*/}
                            {/*<!-- <div className="info info_sms">*/}
                            {/*<p>На ваш номер было отправлено SMS-сообщение с кодом. Пожалуйста, введите его в поле ниже.</p>*/}
                            {/*<div className="form">*/}
                            {/*<input type="text" name="" id="" placeholder="СМС-код" size="10">*/}
                            {/*<button className="button middle">Далее</button>*/}
                            {/*</div>*/}
                            {/*<p className="small_text">Выслать код повторно через 1 минуту 16 секунд</p>*/}
                            {/*</div> -->*/}

                            {/*<!-- Блок каптча - раскомментировать если нужно-->*/}
                            {/*<!-- <div className="info captcha">*/}
                            {/*<div className="captcha_left">*/}
                            {/*<input type="text" name="" id="" placeholder="Введите код" className="small">*/}
                            {/*<a href="#">Обновить код</a>*/}
                            {/*</div>*/}
                            {/*<img src="https://yastatic.net/doccenter/images/tech-ru/cleanweb/freeze/0WLRscWa-KXnsJM3K9jyjORMUEc.gif" alt="" width="140" height="50">*/}
                            {/*</div> -->*/}

                            {/*<!-- Блок ошибки формы -->*/}
                            {/*<!-- <div className="form_error">*/}
                            {/*Неверный номер телефона или пароль!*/}
                            {/*</div> -->*/}

                            {/*<!-- Блок успеха -->*/}
                            {/*<!-- <div className="info info_success">*/}
                            {/*Успешно отправлено!*/}
                            {/*</div> -->*/}

                            {/*<!-- Блок ошибки -->*/}
                            {/*<!-- <div className="info info_error">*/}
                            {/*Нет доступа в личный кабинет. В случае возникновения вопросов позвоните нам в службу поддержки по номеру: <span className="fw_m">8 800 333 7996</span>*/}
                            {/*</div> -->*/}

                            <div className="form_buttons">
                                <input type="submit" value="Далее" className="button second full"/>
                            </div>
                        </div>
                    </div>
                    <div className="login_links">
                        <a href="#">Забыли пароль?</a>
                        <a href="#">Зарегистрироваться</a>
                    </div>
                </div>
            </div>
        </ExternalLayout>
    );
};


export default SignInComponent