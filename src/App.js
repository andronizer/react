import React from "react";
import {useFormik} from 'formik'
import * as Yup from 'yup'

const LoginForm = () => {
  const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().max(10, 'Email must be shorter than 10 characters').required('Required'),
      password: Yup.string().min(6, 'Password should be longer than 6 characters').required()
    }),
    onSubmit: ({email, password}) => {
      alert(`Email: ${email}, password: ${password}`);
    }
  })

  return (
    <form onSubmit={handleSubmit}>      
      <label htmlFor="email">Email</label>
      <input
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        id="email"
        name="email"
        type="text"
      />
      {touched.email && errors.email ? (
        <div>{errors.email}</div>
      ): null}
      <label htmlFor="password">Password</label>
      <input
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        name="password"
        type="password"
      />
      {touched.password && errors.password ? (
        <div>{errors.password}</div>
      ): null}
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;