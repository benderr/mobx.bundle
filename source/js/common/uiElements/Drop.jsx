import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TetherDrop from 'tether-drop';
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

class Drop extends React.Component {

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
        this.props.setInstance && this.props.setInstance(this);
    }

    isOpen() {
        return this.drop && this.drop.isOpened();
    }

    componentWillUnmount() {
        this.destroyDrop();
        this.props.setInstance(null);
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

        const outOptions = {
            position: this.props.position
        };
        const opts = Object.assign({
            target: this.props.target || this.refs.drop,
        }, defaultOptions, outOptions);
        opts.content = (drop) => {
            return ReactDOM.render(this.getDropContent(), this.container);
        };

        this.drop = new TetherDrop(opts);
    }

    handleClickOutside() {
        if (this.drop && this.drop.isOpened()) {
            this.drop.toggle();
        }
        this.props.onClose && this.props.onClose();
    }

    destroyDrop() {
        if (this.drop) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.drop.close();
            this.drop.destroy()
        }
    }


    render() {
        //ref={drop => this.drop = drop}
        return <div ref="drop">
            {this.props.children}
        </div>
    }
}

Drop.propTypes = {
    position: PropTypes.string,
    target: PropTypes.object,
    onClose: PropTypes.func
};

export default enhanceWithClickOutside(Drop)