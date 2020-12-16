import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CGoodsList from '../components/GoodsList';
import actionCategoryFindOne from '../redux/action/actionCategoryFindOne';

function PageCategory({
    match: {
        params: { _id },
    },
    getData,
}) {
    useEffect(() => (getData(_id), undefined), [_id]);
    return (
        <>
            <h1>Категория {_id}</h1>
            <CGoodsList />
        </>
    );
}

const CPageCategory = connect(null, { getData: actionCategoryFindOne })(
    PageCategory
);

export default CPageCategory;
