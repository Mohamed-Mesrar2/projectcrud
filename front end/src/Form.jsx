import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    Date: '',
    Shift: '',
    Client: '',
    N_OF: '',
    Designation: '',
    Famille: '',
    MATRUCULE: '',
    Nombre_piste: '',
    MACHINE: '',
    QTE: '',
    METRAGE: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = 'http://127.0.0.1:8000/create';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Submitting form data:', formData); 

    try {
      const response = await axios.post(apiUrl, formData);

      console.log('Data added successfully:', response.data);

      setFormData({
        Date: '',
        Shift: '',
        Client: '',
        N_OF: '',
        Designation: '',
        Famille: '',
        MATRUCULE: '',
        Nombre_piste: '',
        MACHINE: '',
        QTE: '',
        METRAGE: '',
      });

      Swal.fire({
        icon: 'success',
        title: 'Data Added',
        text: 'Your data has been added successfully!',
      });

      navigate('/'); 
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
        setError(`Error adding data: ${JSON.stringify(error.response.data.errors)}`);
      } else if (error.request) {
        console.error('No response from server:', error.request);
        setError('No response from server. Please try again later.');
      } else {
        console.error('Error:', error.message);
        setError('Error adding data. Please try again.');
      }
    }
  };

  return (
    <>
    <h5>Ajouter en data</h5>
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div>
       
        <label>Date</label>
        <input type="date" name="Date" value={formData.Date} onChange={handleChange} required />
      </div>
      <div>
        <label>Shift</label>
        <input type="text" name="Shift" value={formData.Shift} onChange={handleChange} required />
      </div>
      <div>
        <label>Client</label>
        <input type="text" name="Client" value={formData.Client} onChange={handleChange} required />
      </div>
      <div>
        <label>N_OF</label>
        <input type="number" name="N_OF" value={formData.N_OF} onChange={handleChange} required />
      </div>
      <div>
        <label>Designation</label>
        <input type="text" name="Designation" value={formData.Designation} onChange={handleChange} required />
      </div>
      <div>
        <label>Famille</label>
        <input type="text" name="Famille" value={formData.Famille} onChange={handleChange} required />
      </div>
      <div>
        <label>MATRUCULE</label>
        <input type="number" name="MATRUCULE" value={formData.MATRUCULE} onChange={handleChange} required />
      </div>
      <div>
        <label>Nombre Piste</label>
        <input type="number" name="Nombre_piste" value={formData.Nombre_piste} onChange={handleChange} required />
      </div>
      <div>
        <label>Machine</label>
        <input type="text" name="MACHINE" value={formData.MACHINE} onChange={handleChange} required />
      </div>
      <div>
        <label>QTE</label>
        <input type="number" name="QTE" value={formData.QTE} onChange={handleChange} required />
      </div>
      <div>
        <label>Metrage</label>
        <input type="number" name="METRAGE" value={formData.METRAGE} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form></>
  );
};

export default Form;
