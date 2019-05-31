import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
/*eslint-disable*/
const TileMedia = props => {
    const { children, className, productTile, backgroundImage, ...rest } = props;

    const tileMediaClasses = classnames(
        {
            'fd-tile__media': !productTile,
            'fd-product-tile__media': productTile
        },
        className
    );
    console.log(productTile);

    return (
        <div {...rest} className={tileMediaClasses}
            style={{ backgroundImage: 'url(' + backgroundImage + ')' }}>{children}</div>);
};

TileMedia.displayName = 'Tile.Media';

TileMedia.propTypes = {
    backgroundImage: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string
};

export default TileMedia;
