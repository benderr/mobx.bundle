import React from 'react';
import SiteHeader from 'components/siteHeader';

//Шаблон для анонимных страниц
const InternalLayout = props => {
    return (
        <div className="poss">
            <SiteHeader/>
            <section className="main">
                <div className="section_content">
                    {props.children}
                </div>
            </section>
        </div>
    );
};

export default InternalLayout