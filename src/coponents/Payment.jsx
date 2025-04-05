import React, { useState } from 'react';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment Submitted!');
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>
          <span role="img" aria-label="lock">🔒</span> Secure Payment
        </h2>

        <form onSubmit={handleSubmit}>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Cardholder Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              style={{ ...styles.input, color: 'black' }}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength="16"
              inputMode="numeric"
              style={{ ...styles.input, color: 'black' }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Expiry</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                style={{ ...styles.input, color: 'black' }}
                required
              />
            </div>

            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                maxLength="3"
                placeholder="123"
                inputMode="numeric"
                style={{ ...styles.input, color: 'black' }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={handleCancel} style={{ ...styles.button, backgroundColor: '#6c757d' }}>
              Cancel
            </button>
            <button type="submit" style={styles.button}>
              Subscribe
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#f2f3f7',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#333',
    fontWeight: '600',
    fontSize: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '5px',
    color: '#444',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#fafafa',
    fontSize: '15px',
    outline: 'none',
    transition: 'border 0.2s',
    color: 'black',
  },
  button: {
    flex: 1,
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};

export default PaymentForm;