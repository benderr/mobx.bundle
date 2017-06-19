import React from 'react';
import SiteHeader from 'components/siteHeader';
import {connect} from 'react-redux';
import {getCompany} from 'modules/account/selectors/accountSelectors'

@connect((state) => ({company: getCompany(state)}))
class InternalLayout extends React.Component {
    render() {
        return (
            <div class="poss">
                <SiteHeader company={this.props.company}/>
                <section class="main">
                    <div class="section_content full_width">
                        {this.props.children}
                    </div>
                </section>
            </div>

        );
    }
}

export default InternalLayout;