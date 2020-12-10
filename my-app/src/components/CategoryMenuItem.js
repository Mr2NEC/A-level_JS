import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryMenuItem ({
    category: { _id, name } = { _id: 'NOID', name: 'NO Category' },
})
    {return <li>
                <Link to={`/category/${_id}`}>{name}</Link>
            </li>
    }
