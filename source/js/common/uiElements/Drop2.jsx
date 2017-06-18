/**
 * Created by RobertSabiryanov on 15.06.17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Drop from 'tether-drop';
import enhanceWithClickOutside from 'react-click-outside';


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
        this.state = {
            isOpened: false
        }
    }

    reposition() {
        if (this.drop) {
            this.drop.position();
        }
    }

    componentDidMount() {
        this.initDrop();
    }

    componentWillUnmount() {
        this.destroyDrop();
    }

    getDropContent() {
        const {children} = this.props;
        const dropContent = React.Children.map(children, (child) => {
            if (child.props.className.indexOf('drop-content') > -1) {
                return child;
            }
        })[0];
        if (!dropContent) {
            throw new Error('Child element with class drop-content must be specified');
        }
        return dropContent;
    }

    initDrop() {

        const opts = Object.assign({
            target: this.refs.drop,
        }, defaultOptions, this.props.opts);
        opts.content = (drop) => {
            return ReactDOM.render(this.getDropContent(), this.container);
        };

        this.drop = new Drop(opts);
    }

    handleClickOutside() {
        if (this.drop && this.drop.isOpened()) {
            this.drop.toggle();
        }
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

export default enhanceWithClickOutside(Drop2)