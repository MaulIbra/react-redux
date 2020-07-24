import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SamplePropTypeCoomponent extends Component {
    render() {
        let children = this.props.children;
        return (
            <div>
                {/*default props menggunakan simbol ||*/}
                {/*MyName: {this.props.name || 'Maulana'}*/}
                {/*MyName: {this.props.name}*/}
                {children}
            </div>
        );
    }
}

SamplePropTypeCoomponent.propTypes = {
    // name: PropTypes.string,
    children : PropTypes.element.isRequired
};

export default SamplePropTypeCoomponent;