import  { useContext, useState } from 'react';
import './register.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas/register';
import { showNotification } from '../../assets/alerts/sweetAlert';
import AuthContext from '../../context/AuthProvider';
import { axiosNormal } from '../../Axios/axios';
import SpinLoader from '../../assets/spinner/spinner'

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};



const RegisterForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values, { resetForm }) => {
      registerUserAirbnb(values, resetForm)
    }
  });



  const registerUserAirbnb = async (data, resetForm) => {
    try {
      setIsLoading(true);
      const response = await axiosNormal.post('/auth/register', data)
      await setAuth(response.data)
      showNotification(response.data.status, response.data.message)
      resetForm();
      setIsLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setAuth('');
      console.error(err);
      showNotification(err.response.data.status, err.response.data.message)
      setIsLoading(false);
    }
  }

  // const handleRegister = () => {
  //   navigate('/');
  // };

  const handleGoToRegister = () => {
    navigate('/login');
  };
  return (
   <>
      {
        !isLoading ?
          <div className='register'>
            <div className="register-container">
              <h2 className="register-label">Sign Up</h2>
              <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-form-group">
                  <div className="register-input-container">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Name"
                      className="register-input"

                    />
                    {errors.name && touched.name ? <p className='register-error'>{errors.name}</p> : null}
                  </div>
                </div>
                <div className="register-form-group">
                  <div className="register-input-container">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email"
                      className="register-input"
                    />
                    {errors.email && touched.email ? <p className='register-error'>{errors.email}</p> : null}
                  </div>
                </div>
                <div className="register-form-group">
                  <div className="register-input-container">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Password"
                      className="register-input"

                    />
                    {errors.password && touched.password ? <p className='register-error'>{errors.password}</p> : null}
                  </div>
                </div>
                <div className="register-form-group">
                  <div className="register-input-container">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Confirm Password"
                      className="register-input"

                    />
                    {errors.confirmPassword && touched.confirmPassword ? <p className='register-error'>{errors.confirmPassword}</p> : null}
                  </div>
                </div>
                <button type="submit"  className="register-button">Register</button>
              </form>
              <div className='register-to-register'>
                <p>Already a member?
                  <span>
                    <strong onClick={handleGoToRegister}> login here</strong>
                  </span>
                </p>
              </div>
            </div>
            <div className='register-img-container'>
              <img className='register-img' src='https://i.ibb.co/PC9nVNw/register.jpg' alt='sign up' />
            </div>
          </div> :
          <SpinLoader />
      }
    </>
  );
};

export default RegisterForm;