import React from 'react';
import SiteHeader from 'components/siteHeader';
import {connect} from 'react-redux';
import {getAuthData} from 'modules/account/selectors/accountSelectors'

//Шаблон для анонимных страниц
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

export default connect(mapStateToProps)(InternalLayout)

function mapStateToProps(state) {
    const data = getAuthData(state);
    return {
        company: data != null ? data.get('company') : '',
    }
}
