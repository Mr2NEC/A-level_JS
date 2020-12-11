import React from 'react';
import { Link } from 'react-router-dom';

export default function GoodsCard({ _id, name }) {
    return (
        <li>
            <Link to={`/good/${_id}`}>{name}</Link>
        </li>
    );
}
