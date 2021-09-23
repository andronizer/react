import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./loginForm.css";
import { saveTokenInLocalStorage } from "../app/service";
import { useHistory } from "react-router-dom";
import Title from "../title/Title";
import Button from "../button/Button";
import { Input } from "../input/Input";
import apiService from "../../services/apiService";
import { setIsAuthenticated } from "../../store/reducers/appSlice";
import { useDispatch } from "react-redux";
import { emailValidation, passwordValidation } from "../../services/validation";

const initialValues = { email: "", password: "" };

const LoginForm = () => {
  const history = useHistory();
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const handleOnSubmit = useCallback((data) => {
    apiService
      .post("/api/login", data)
      .then((response) => {
        saveTokenInLocalStorage(response);
        dispatch(setIsAuthenticated(true));
        history.push("/main/all");
      })
      .catch(function (error) {
        console.log(error);
        setErr(true);
      });
  }, []);

  const { handleSubmit, touched, errors, ...formik } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: emailValidation,
      password: passwordValidation,
    }),
    onSubmit: handleOnSubmit,
  });

  const handleToSignup = useCallback(() => {
    history.push("/signup");
  }, []);

  return (
    <div className="loginFormWrapper">
      <div className="loginWrapper">
        <Title>Hi! I'm Todooster!</Title>
        <form onSubmit={handleSubmit}>
          <div className="inputWrapper">
            {err && (
              <span className="errorMessage">
                Incorrect! Try again or sign up.
              </span>
            )}
            <div>
              <Input
                type="email"
                placeholder="user@mail.ru"
                errors={errors}
                touched={touched}
                {...formik.getFieldProps("email")}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="password123"
                errors={errors}
                touched={touched}
                {...formik.getFieldProps("password")}
              />
            </div>
          </div>
          <div className="buttonWrapper">
            <Button className="buttonLogin" type={"submit"}>
              Log In
            </Button>
            <Button type={"button"} onClick={handleToSignup}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
