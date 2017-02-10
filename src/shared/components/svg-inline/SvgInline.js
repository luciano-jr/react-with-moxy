import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import SvgInlineReact from 'svg-inline-react';
import './SvgInline.css';

class SvgInline extends PureComponent {
    render() {
        const { className, svg, ...props } = this.props;

        return (
            <SvgInlineReact className={ classnames('svg-inline', className) } src={ svg } { ...props } />
        );
    }
}

SvgInline.propTypes = {
    svg: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default SvgInline;
