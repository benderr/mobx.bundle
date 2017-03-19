import React from 'react';
import {IndexLink, Link} from 'react-router';
import {routeCodes} from 'routes/routeCodes';

export  default () => {
    return (
        <div className='Menu'>
            <IndexLink to={ routeCodes.DASHBOARD }>
                Главная
            </IndexLink>
            <Link to={ routeCodes.SIGN_IN }>
                Войти
            </Link>
            <Link to={ routeCodes.LIST_EXAMPLE }>
                Пример списка
            </Link>
        </div>
    );
};

