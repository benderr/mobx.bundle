/**
 * Created by RobertSabiryanov on 14.06.17.
 */
import React from 'react';
import TetherComponent from 'react-tether';

class Drop extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {isOpen} = this.state;
        const {children} = this.props;
        return (<TetherComponent
            attachment="top center"
            constraints={[{
                to: 'scrollParent',
                attachment: 'together'
            }]}
        >
            {isOpen ? <div>{children}</div> : <div style={{display: "none"}}></div>}
        </TetherComponent>)
    }
}

export default Drop;