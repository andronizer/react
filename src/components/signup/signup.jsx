import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import Button from "../button/Button";
import { Input } from "../input/Input";
import "./signup.css";

const Signup = () => {
  const [isRegistered, setRegister] = useState(false);
  const history = useHistory();

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .max(15, "Name must be shorter than 15 characters")
          .required(),
        email: Yup.string()
          .max(20, "Email must be shorter than 20 characters")
          .required(),
        password: Yup.string()
          .min(5, "Password should be longer than 5 characters")
          .required(),
      }),
      onSubmit: ({ name, email, password }) => {
        axios({
          method: "post",
          url: "http://localhost:8080/api/signup",
          data: {
            name: name,
            email: email,
            password: password,
          },
        })
          .then((response) => {
            console.log(response.status);
            setRegister(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    });

  if (isRegistered) {
    return <Redirect to={"/main"} />;
  }

  return (
    <div className={"loginWrapper"}>
      <AppHeader>Sign Up, Please!</AppHeader>
      <form onSubmit={handleSubmit}>
        <div className={"input_container"}>
          <div className={"inputWrappeer"}>
            <Input
              className={"input"}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              id={"name"}
              name={"name"}
              type={"text"}
              placeholder={"nickname"}
            />
            {touched.name && errors.name ? (
              <div className={"requiredStyle"}>{errors.name}</div>
            ) : null}
          </div>
          <div className={"inputWrappeer"}>
            <Input
              className={"input"}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              id={"email"}
              name={"email"}
              type={"text"}
              placeholder={"user@email.com"}
            />
            {touched.email && errors.email ? (
              <div className={"requiredStyle"}>{errors.email}</div>
            ) : null}
          </div>
          <div className={"inputWrappeer"}>
            <Input
              className="input"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              id="password"
              name="password"
              type="password"
              placeholder="password123"
            />
            {touched.password && errors.password ? (
              <div className={"requiredStyle"}>{errors.password}</div>
            ) : null}
          </div>
        </div>
        <div className="buttonWrapper">
          <Button className={"buttonSignup"}>Sign Up</Button>
          <Button type={"button"} onClick={() => history.push("/login")}>
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
