import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./login-form.css";
import { saveTokenInLocalStorage } from "../app/service";
import { Redirect, useHistory } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import Button from "../button/Button";
import { Input } from "../input/Input";
import apiService from "../../services/api.service";
import { setIsAuthenticated } from "../../store/reducers/appSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .max(20, "Email must be shorter than 20 characters")
          .required(),
        password: Yup.string()
          .min(5, "Password should be longer than 5 characters")
          .required(),
      }),
      onSubmit: ({ email, password }) => {
        apiService
          .post("/api/login", { email, password })
          .then((response) => {
            console.log(response.status);
            saveTokenInLocalStorage(response.data);
            dispatch(setIsAuthenticated(true));
            setIsLogin(true);
          })
          .catch(function (error) {
            console.log(error);
            setErr(true);
          });
      },
    });

  const inputs = [
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

  const navigation = useCallback(() => {
    history.push("/signup");
  }, []);

  if (isLogin) {
    return <Redirect to={"/main"} />;
  }

  return (
    <div className="loginWrapper">
      <AppHeader>Hi! I'm Todooster!</AppHeader>
      <form onSubmit={handleSubmit}>
        <div className="inputWrapper">
          {err && <span>Sign up, please</span>}
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
                  <div className="requiredStyle">{errorMessage}</div>
                )}
              </>
            );
          })}
        </div>
        <div className="buttonWrapper">
          <Button className="buttonLogin" type={"submit"}>
            Log In
          </Button>
          <Button type={"button"} onClick={navigation}>
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
