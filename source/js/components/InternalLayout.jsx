import React from 'react';
import SiteHeader from 'components/siteHeader';
import {connect} from 'react-redux';
import {getProfile} from 'modules/account/selectors/accountSelectors'

//Шаблон для анонимных страниц
class InternalLayout extends React.Component {
    render() {
        const css = {
            position: 'static'
        };
        const profileName = this.props.lastName + ' ' + this.props.firstName;

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
    const profile = getProfile(state);
    return {
        lastName: profile != null ? profile.get('lastName') : 'NULL',
        firstName: profile != null ? profile.get('firstName') : ''
    }
}
