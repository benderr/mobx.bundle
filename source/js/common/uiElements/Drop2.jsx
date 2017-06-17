/**
 * Created by RobertSabiryanov on 15.06.17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Drop from 'tether-drop';


const defaultOptions = {
    position: 'bottom left',
    openOn: 'click',
    constrainToWindow: true,
    constrainToScrollParent: true,
    classes: 'drop-theme-basic',
    hoverOpenDelay: 0,
    hoverCloseDelay: 50,
    focusDelay: 0,
    blurDelay: 50,
    tetherOptions: {},
};

// attachment="top center"
// constraints={[{
//     to: 'scrollParent',
//     attachment: 'together'
// }]}

class Drop2 extends React.Component {

    constructor() {
        super();
        this.container = document.createElement('div');
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.destroyDrop();
        this.initDrop();
        return true;
    }

    componentDidMount() {
        this.initDrop();
    }

    componentWillUnmount() {
        this.destroyDrop();
    }

    initDrop() {
        const {children} = this.props;
        const dropContent = React.Children.map(children, (child) => {
            if (child.props.className.indexOf('drop-content') > -1) {
                return child;
            }
        })[0];
        if (!dropContent) {
            throw new Error('Child element with class drop-content must be specified');
        }

        const opts = Object.assign({
            target: this.refs.drop,
            content:  ReactDOM.render(dropContent, this.container)
        }, defaultOptions, this.props.opts);

        this.drop = new Drop(opts)
    }

    destroyDrop() {
        if (this.drop) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.drop.close();
            this.drop.destroy()
        }
    }

    render() {
        return <div ref='drop'>
            {this.props.children}
        </div>
    }
}

export default Drop2