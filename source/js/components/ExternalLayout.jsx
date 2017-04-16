import React from 'react';

//Шаблон для анонимных страниц
const ExternalLayout = (props) => {
    return (
        <div className="reg">
            {props.children}
        </div>
    );
};

export default ExternalLayout