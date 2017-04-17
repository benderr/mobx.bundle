import React from 'react';
import SiteHeader from 'components/siteHeader';
import {connect} from 'react-redux';

//Шаблон для анонимных страниц
class InternalLayout extends React.Component {
    render() {
        const css = {
            position: 'static'
        };
        const profileName = this.props.authData ? this.props.authData.get('token') : 'NULL';

        return (
            <div className="poss">
                <SiteHeader name={profileName}/>
                <section className="main">
                    <div className="section_content" style={css}>
                        {this.props.children}
                    </div>
                </section>
                {
                    this.props.layer &&
                    <article className="page  side_right open">

                        <div className="page_left">

                            <div class="page_header">
                                <a className="page_close icon-close"></a>
                                <a className="page_expand icon-fullsize"></a>
                                <h1>
                                    Платежное требование №1
                                </h1>

                            </div>

                            <div class="page_content">
                                {this.props.layer}
                            </div>
                        </div>
                    </article>
                }
            </div>

        );
    }
}

export default connect(mapStateToProps)(InternalLayout)

function mapStateToProps(state) {
    return {
        loading: state.account.get('loading'),
        authError: state.account.get('authError'),
        authData: state.account.get('authData')
    }
}
