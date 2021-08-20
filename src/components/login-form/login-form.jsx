import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./login-form.css";
import { saveTokenInLocalStorage } from "../app/service";
import { Redirect } from "react-router-dom";
import AppHeader from "../app-header/app-header";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .max(20, "Email must be shorter than 20 characters")
          .required("Required"),
        password: Yup.string()
          .min(5, "Password should be longer than 5 characters")
          .required(),
      }),
      onSubmit: ({ email, password }) => {
        axios({
          method: "post",
          url: "http://localhost:8080/api/signin",
          data: {
            email: email,
            password: password,
          },
        })
          .then((response) => {
            console.log(response.status);
            saveTokenInLocalStorage(response.data);
            setIsLogin(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    });

  if (isLogin) {
    return <Redirect to={"/dashboard"} />;
  }

  return (
    <div>
      <AppHeader />
      <form onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            className="input_email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            name="email"
            type="text"
            placeholder="user@email.com"
          />
          {touched.email && errors.email ? <div>{errors.email}</div> : null}
          <label htmlFor="password">Password</label>
          <input
            className="input_password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password"
            name="password"
            type="password"
            placeholder="password123"
          />
          {touched.password && errors.password ? (
            <div>{errors.password}</div>
          ) : null}

          <button className="input_button" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
