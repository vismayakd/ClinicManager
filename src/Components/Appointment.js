import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Appointment() {
    const { doc_id } = useParams();
    console.log("id", doc_id)
    const [formData, setFormData] = useState({ patient_name: '', age: '', appointment_date: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const AppointmentSubmit = async (e) => {
        console.log('submit')
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8000/appointments/',
                {
                    ...formData,
                    doctor: doc_id
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (response.status === 201) {
                alert('Appointment booked successfully!');
                navigate('/doctors');
            }
        } catch (err) {
            alert('Something went wrong. Please try again.');
        }
    }




    return (
        <div className="container d-flex justify-content-center align-items-center" >
            <div className="card p-4 shadow m-4 bg-light" style={{ width: '100%', maxWidth: '500px' }}>
                <h4 className="text-center mb-4">Book Appointment</h4>

                <form onSubmit={AppointmentSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor='patient_name'>Patient Name</label>
                        <input type="text" className='form-control' name="patient_name" value={formData.patient_name}
                            required onChange={handleChange} />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor='age'>Age</label>
                        <input type="number" className='form-control' name="age" value={formData.age}
                            required onChange={handleChange} />
                    </div>

                    <div className="form-group mb-3">
                        <label>Appointment Date</label>
                        <input type="date" className='form-control' name="appointment_date" value={formData.appointment_date}
                            required onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Book Now</button>
                </form>
            </div>
        </div>
    )
}
export default Appointment;
