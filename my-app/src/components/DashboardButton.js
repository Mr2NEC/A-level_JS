import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardButton({ children }) {
    return (
        <Link to={`/Dashboar/`}>
            <button>{children}</button>
        </Link>
    );
}
