import React from 'react';
import Menu from 'components/Global/Menu';

//Шаблон для анонимных страниц
const InternalLayout = props => {
    return (
        <div className="poss">
            <Menu/>
            <section className="main">
                <div className="section_content">
                    {props.children}
                </div>
            </section>
        </div>
    );
};

export default InternalLayout