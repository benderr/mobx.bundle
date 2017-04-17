import React from 'react';
import SiteHeader from 'components/siteHeader';
import {connect} from 'react-redux';

//Шаблон для анонимных страниц
class LayerLayout extends React.Component {
    render() {
        const css = {
            position: 'static'
        };
        const profileName = this.props.authData ? this.props.authData.get('token') : 'NULL';

        return (
            <div className="poss">
                <SiteHeader name={profileName}/>
                <article className="page  side_right open">

                    <div className="page_left">

                        <div className="page_header">
                            <a className="page_close icon-close"></a>
                            <a className="page_expand icon-fullsize"></a>
                            <h1>
                                Платежное требование №1
                            </h1>

                        </div>

                        <div className="page_content">
                            {this.props.children}
                        </div>
                    </div>
                </article>
            </div>

        );
    }
}

export default connect(mapStateToProps)(LayerLayout)

function mapStateToProps(state) {
    return {
        loading: state.account.get('loading'),
        authError: state.account.get('authError'),
        authData: state.account.get('authData')
    }
}
