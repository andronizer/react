import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect, useHistory } from "react-router-dom";
import { saveTokenInLocalStorage } from "../app/service";
import AppHeader from "../app-header/app-header";
import Button from "../button/Button";
import { Input } from "../input/Input";
import "./signup.css";
import apiService from "../../services/api.service";
import { setIsAuthenticated } from "../../store/reducers/appSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [isRegistered, setRegister] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

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
        apiService
          .post("/api/signup", { name, email, password })
          .then((response) => {
            console.log(response.status);
            saveTokenInLocalStorage(response.data);
            dispatch(setIsAuthenticated(true));
            setRegister(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    });

  const navigation = useCallback(() => {
    history.push("/login");
  }, []);

  if (isRegistered) {
    return <Redirect to={"/main"} />;
  }

  const inputs = [
    {
      value: values.name,
      id: "name",
      name: "name",
      type: "text",
      placeholder: "nickname",
      errorMessage: errors.name,
      inputTouched: touched.name,
    },
    {
      value: values.email,
      id: "email",
      name: "email",
      type: "text",
      placeholder: "user@email.com",
      errorMessage: errors.email,
      inputTouched: touched.email,
    },
    {
      value: values.password,
      id: "password",
      name: "password",
      type: "password",
      placeholder: "password123",
      errorMessage: errors.password,
      inputTouched: touched.password,
    },
  ];

  return (
    <div className="loginWrapper">
      <AppHeader>Sign Up, Please!</AppHeader>
      <form onSubmit={handleSubmit}>
        <div className="inputWrapper">
          {inputs.map((item, index) => {
            const {
              value,
              id,
              name,
              type,
              placeholder,
              errorMessage,
              inputTouched,
            } = item;
            return (
              <>
                <Input
                  key={index}
                  value={value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id={id}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                />
                {inputTouched && errorMessage && (
                  <div className={"requiredStyle"}>{errorMessage}</div>
                )}
              </>
            );
          })}
        </div>
        <div className="buttonWrapper">
          <Button type="submit" className="buttonSignup">
            Sign Up
          </Button>
          <Button type={"button"} onClick={navigation}>
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
