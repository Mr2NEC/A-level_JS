import React from 'react';
import CategoryMenuItem from './CategoryMenuItem';
import { Link } from 'react-router-dom';

export default function CategoryMenu({
    categories = [
        {
            _id: '5dc45acf5df9d670df48cc48',
            name: "TV's",
        },
        {
            _id: '5dc49f4d5df9d670df48cc64',
            name: 'Airconditions',
        },
        {
            _id: '5dc458985df9d670df48cc47',
            name: 'Smartphones',
        },
    ],
}) {
    return (
        <aside>
            <ul>
                <li>
                    <Link to={`/`}>Главная</Link>
                </li>
                {categories &&
                    categories.map((category) => (
                        <CategoryMenuItem
                            key={category._id}
                            category={category}
                        />
                    ))}
            </ul>
        </aside>
    );
}
