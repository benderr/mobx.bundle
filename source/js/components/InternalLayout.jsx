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
