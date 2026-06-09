import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();

  const pathname = location.pathname;

  return (
    <section style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404: Not Found</h2>

      <p style={{ fontSize: '18px', margin: '20px 0' }}>
        Oops! The path{' '}
        <code
          style={{
            backgroundColor: '#eee',
            padding: '4px 8px',
            borderRadius: '4px',
            color: '#d9534f',
          }}
        >
          {pathname}
        </code>{' '}
        does not exist.
      </p>

      <Link
        to="/lessons/lesson-10"
        style={{
          display: 'inline-block',
          marginTop: '16px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
        }}
      >
        Return to Home
      </Link>
    </section>
  );
}
