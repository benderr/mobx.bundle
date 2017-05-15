import React from 'react';
import SiteHeader from 'components/siteHeader';
import {connect} from 'react-redux';
import {getCompany} from 'modules/account/selectors/accountSelectors'

@connect((state) => ({company: getCompany(state)}))
class InternalLayout extends React.Component {
    render() {
        const css = {
            position: 'static'
        };

        return (
            <div class="poss">
                <SiteHeader company={this.props.company}/>
                <section class="main">
                    <div class="section_content" style={css}>
                        {this.props.children}
                    </div>
                </section>
            </div>

        );
    }
}

export default InternalLayout;