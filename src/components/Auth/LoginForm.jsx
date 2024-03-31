import  { useState } from 'react';
import './login.css';

import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/index';
import { showNotification } from '../../assets/alerts/sweetAlert';
import useAuth from '../../hooks/useAuth';
import { axiosNormal } from '../../Axios/axios';
import SpinLoader from '../../assets/spinner/spinner';

const initialValues = {
  email: '',
  password: ''
};

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const from = location.state?.from?.pathname || '/';

  const { setAuth } = useAuth();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const response = await axiosNormal.post('/auth/login', values); 
        await setAuth(response.data);
        showNotification(response.data.status, response.data.message);
        resetForm();
        setIsLoading(false);
        navigate(from, { replace: true });
      } catch (err) {
        console.error(err);
        const errorMessage = err.response?.data?.message || 'Login failed!'; 
        showNotification('error', errorMessage); 
        setIsLoading(false);
      }
    }
  });

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <>
      {!isLoading ? (
        <div className='login'>
          <div className="login-container">
            <h2 className="login-label">LOGIN</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-form-group">
                <div className="login-input-container">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    className="login-input"
                  />
                  {errors.email && touched.email ? (
                    <p className='login-error'>{errors.email}</p>
                  ) : null}
                </div>
              </div>
              <div className="login-form-group">
                <div className="login-input-container">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className="login-input"
                  />
                  {errors.password && touched.password ? (
                    <p className='login-error'>{errors.password}</p>
                  ) : null}
                </div>
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <div className='login-to-register'>
              <p>
                Not a member?{' '}
                <span>
                  <strong onClick={handleGoToRegister}>Register here</strong>
                </span>
              </p>
            </div>
          </div>
          <div className='login-img-container'>
            <img className='login-img' src='https://i.ibb.co/FmLRBMd/photo-1575936123452-b67c3203c357.jpg' alt='login'></img>
          </div>
        </div>
      ) : (
        <SpinLoader />
      )}
    </>
  );
};

export default LoginForm;
