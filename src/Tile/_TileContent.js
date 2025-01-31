import classnames from 'classnames';
import CustomPropTypes from '../utils/CustomPropTypes/CustomPropTypes';
import PropTypes from 'prop-types';
import React from 'react';

const TileContent = props => {
    const { title, children, className, headingLevel, titleProps, ...rest } = props;

    const tileContentClasses = classnames(
        'fd-tile__content',
        className
    );

    const HeadingTag = `h${headingLevel}`;

    return (
        <div {...rest} className={tileContentClasses}>
            <HeadingTag {...titleProps} className='fd-tile__title'>{title}</HeadingTag>
            {children}
        </div>
    );
};

TileContent.displayName = 'Tile.Content';

TileContent.propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    headingLevel: CustomPropTypes.range(2, 6),
    titleProps: PropTypes.object
};

TileContent.defaultProps = {
    headingLevel: 3
};

export default TileContent;
