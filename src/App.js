import React from "react";
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import './App.css'

const LoginForm = () => {
  const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().max(20, 'Email must be shorter than 20 characters').required('Required'),
      password: Yup.string().min(5, 'Password should be longer than 5 characters').required()
    }),
    onSubmit: ({email, password}) => {
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/login',
        data: {
          email: 'andronizer@mail.ru',
          password: '12345678'
        }
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  })

  return (
    <form onSubmit={handleSubmit}>      
     <header
      className='header'>
       <h1
        className='title'>Welcome to Todo App! Log in, please!</h1>
     </header>
      <div 
       className='input_container'>
      <label htmlFor="email">Email</label>
      <input
        className='input_email'
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        id="email"
        name="email"
        type="text"
        placeholder='user@email.com'
      />
      {touched.email && errors.email ? (
        <div>{errors.email}</div>
      ): null}
      <label htmlFor="password">Password</label>
      <input
        className='input_password'
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        name="password"
        type="password"
        placeholder='password123'
      />
      {touched.password && errors.password ? (
        <div>{errors.password}</div>
      ): null}
     
      <button 
        className='input_button'
        type="submit">Log in</button>
     </div>
    </form>
  );
};

export default LoginForm;