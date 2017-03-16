import React, {PropTypes} from 'react';

import Menu from 'components/Global/Menu';

const App = ({children}) => {
    return (
            <div>
                { children }
            </div>
    );
};

App.propTypes = {
    children: PropTypes.object,
};
export default App;

