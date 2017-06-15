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

    componentDidMount () {
        const {children} = this.props;
        const dropContent = children.filter(child=>child.props.className.indexOf('drop-content') > -1)[0];
        //const element = children.filter(child=>child.props.name==='label')[0];
        const opts = Object.assign({
            target: this.refs.drop,
            content: ReactDOM.render(dropContent, document.createElement('div'))
        }, defaultOptions, this.props.opts);

        this.drop = new Drop(opts)
    }

    componentWillUnmount () {
        if(this.drop) {
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