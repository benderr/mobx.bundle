import React from 'react';

//Шаблон для анонимных страниц
const ExternalLayout = (props) => {
    return (
        <div className="reg">
            <div>{new Date().getTime()}</div>
            {props.children}
        </div>
    );
};

export default ExternalLayout