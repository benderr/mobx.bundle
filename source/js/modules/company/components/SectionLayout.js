import React from 'react';
import SectionHeader from './SectionHeader';

class SectionLayout extends React.Component {
  render() {
    return (
      <div class='poss'>
        <SectionHeader />
        <section class='main'>
          <div class='section_content full_width'>
            {this.props.children}
          </div>
        </section>
      </div>

    );
  }
}

export default SectionLayout;
