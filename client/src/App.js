import React, { useState } from 'react';
import DownBar from './components/downBar';
function App() {
  const [formData, setFormData] = useState({
    // Initialize form fields
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submitFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      // Handle response as needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div className="App">
      <div>Anirudh</div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <textarea name="message" value={formData.message} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <DownBar />
    </div>
  );
}

export default App;
