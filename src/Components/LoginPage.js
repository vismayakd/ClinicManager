import React ,{ useState}  from 'react';
import axios from 'axios';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';




function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const LoginClick = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:8000/login/', {
         username, password 
        });
      if (response.status === 200){
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/doctors');
      }else{
        alert("Login Failed")
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };
  

  
  return (
    <div className="container mt-5 p-4 w-50 h-50 login_container">
      <h2 className="text-center mb-2">LOGIN</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-b">Username</label>
          <input type="text" className="form-control" id="username" 
            placeholder='Enter your username' required autoComplete="username"
            value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-b">Password</label>
          <input type="password" className="form-control" id="password" 
            placeholder='Enter your password' required  autoComplete="current-password"
            value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-100" onClick={LoginClick}>Login</button>
      </form>
    </div>

  )
}
export default LoginPage;
