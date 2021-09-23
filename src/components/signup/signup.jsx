import React, { useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { saveTokenInLocalStorage } from "../app/service";
import Title from "../title/Title";
import Button from "../button/Button";
import { Input } from "../input/Input";
import "./signup.css";
import apiService from "../../services/apiService";
import { setIsAuthenticated } from "../../store/reducers/appSlice";
import { useDispatch } from "react-redux";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../../services/validation";

const initialValues = { name: "", email: "", password: "" };

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnSubmit = useCallback((data) => {
    apiService
      .post("/api/signup", data)
      .then((response) => {
        saveTokenInLocalStorage(response);
        dispatch(setIsAuthenticated(true));
        history.push("/main/all");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const { handleSubmit, touched, errors, ...formik } = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: nameValidation,
      email: emailValidation,
      password: passwordValidation,
    }),
    onSubmit: handleOnSubmit,
  });

  const handleToLogin = useCallback(() => {
    history.push("/login");
  }, []);

  return (
    <div className="signupWrapper">
      <div className="loginWrapper">
        <Title>Sign Up, Please!</Title>
        <form onSubmit={handleSubmit}>
          <div className="inputWrapper">
            <div>
              <Input
                type="text"
                placeholder="nickname"
                errors={errors}
                touched={touched}
                {...formik.getFieldProps("name")}
              />
            </div>
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
            <Button type="submit" className="buttonSignup">
              Sign Up
            </Button>
            <Button type={"button"} onClick={handleToLogin}>
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
