import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
