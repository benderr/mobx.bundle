import React from 'react';
import SiteHeader from 'components/SiteHeader';
import SectionMenu from './SectionMenu';

class SectionLayout extends React.Component {
  render() {
    return (
      <div class='poss'>
        <SiteHeader />
        <section class='main'>
          <div class='section_content full_width'>
            <SectionMenu/>
            {this.props.children}
          </div>
        </section>
      </div>

    );
  }
}

export default SectionLayout;
