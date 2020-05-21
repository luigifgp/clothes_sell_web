import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";


import './collections-overview.styles.scss';

import CollectionPreview from '../preview/preview-collections';

const CollectionsOverview = ({collections}) => (
    <div className="collections-overview">
          {
        collections.map(({id, ...otherCollectionsProps}) => (
        <CollectionPreview key={id} {...otherCollectionsProps}/>
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);