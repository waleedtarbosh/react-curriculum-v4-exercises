import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();

  function handleGoHome() {
    navigate('/');
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <section>
      <h2>Checkout</h2>
      <p>This page exists to practice useNavigate().</p>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={handleGoHome}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Go Home (navigate)
        </button>

        <button
          onClick={handleBack}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Back (navigate -1)
        </button>
      </div>
    </section>
  );
}
