import React from 'react';
import '../../../markup/stylus/login.styl';

class ExternalLayout extends React.Component {
    render() {

        return (
            <div class="login">
                <header class="login_header">
                    <a href="#"><strong>Модуль</strong>Касса</a>
                </header>
                {this.props.children}
            </div>
        );
    }
}

export default ExternalLayout

