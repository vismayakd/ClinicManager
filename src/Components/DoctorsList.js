import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DoctorsList() {
  const [profile, setProfile] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [appointment_list, setAppointmentList] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token", token)
    if (!token) return;

    const headers = {
      Authorization: `Token ${token}`,
    };

    axios.get('http://localhost:8000/user/', { headers })
      .then(res => {
        setProfile(res.data);
      })
      .catch(err => {
        console.error("Profile fetch error", err);
      });


    axios.get('http://localhost:8000/doctors/', { headers })
      .then(res => {
        setDoctors(res.data);
      })
      .catch(err => {
        console.error("Doctor fetch error", err);
      });
    axios.get('http://localhost:8000/booked_list/', { headers })
      .then(res => {
        setAppointmentList(res.data);
      })
      .catch(err => {
        console.error("Booked list fetch error", err);
      });
  }, []);
  const AppointmentClick = async (doc_id) => {

    console.log("Book appointment for doctor ID:", doc_id);
    navigate(`/appointment/${doc_id}`);
  }

  return (

    <div className=" w-100 h-100">
      <nav className="navbar bg-success">
        <div className="container-fluid">
          <div className="navbar-header mt-4">
            <a className="navbar-brand text-warning fs-3" href="">
              {profile && <h2>Welcome, {profile.username}</h2>}
            </a>
          </div>
        </div>
      </nav>

      <div className="container mt-2">
        <h2 className="text-success text-center">DOCTORS LIST</h2>

        <div className="row m-4">
          {doctors.map(doc => (
            <div className="col-md-4 mb-4" key={doc.id}>
              <div className="card h-100 shadow-sm bg-light">
                <div className="card-body">
                  <h5 className="card-title text-primary">Dr. {doc.name}</h5>
                  <p className="card-text">Speciality: {doc.speciality}</p>
                  <button className="btn btn-success mt-2" onClick={() => AppointmentClick(doc.id)} >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row m-4">
          <h2 className="text-success text-center">BOOKED APPOINTMENTS</h2>
          {appointment_list.map(app_list => (
            <div className="col-md-4 mb-4" key={app_list.id}>
              <div className="card h-100 shadow-sm bg-light">
                <div className="card-body">
                  <h5 className="card-title text-dark">{app_list.patient_name}</h5>
                  <p className="card-text">Date: {app_list.appointment_date}</p>
                  <p className="card-text">Doctor_ID: {app_list.doctor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}
export default DoctorsList;
