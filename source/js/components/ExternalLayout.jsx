import React from 'react';

//Шаблон для анонимных страниц
const ExternalLayout = (props) => {
    return (
        <div class="reg">
            {props.children}
        </div>
    );
};

export default ExternalLayout

