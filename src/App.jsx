
import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({ email: '', title: '', description: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch('https://helpdesk-production-8e73.up.railway.app/ticket/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('¡Ticket enviado con éxito!');
        setForm({ email: '', title: '', description: '' });
      } else {
        setStatus('Error al enviar el ticket.');
      }
    } catch {
      setStatus('Error de red al enviar el ticket.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Enviar Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:<br />
          <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%' }} />
        </label><br /><br />
        <label>Título:<br />
          <input name="title" type="text" value={form.title} onChange={handleChange} required style={{ width: '100%' }} />
        </label><br /><br />
        <label>Descripción:<br />
          <textarea name="description" value={form.description} onChange={handleChange} required style={{ width: '100%' }} />
        </label><br /><br />
        <button type="submit">Enviar ticket</button>
      </form>
      {status && <p style={{ marginTop: 20 }}>{status}</p>}
    </div>
  );
}

export default App;
