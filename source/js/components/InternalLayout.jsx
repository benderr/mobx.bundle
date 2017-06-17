import React from 'react';
import SiteHeader from 'components/siteHeader';


class InternalLayout extends React.Component {
    render() {
        const css = {
            position: 'static'
        };

        return (
            <div class="poss">
                <SiteHeader company={this.props.company} points={this.props.points}/>
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