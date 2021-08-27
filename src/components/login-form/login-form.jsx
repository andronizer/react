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

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const [err, setErr] = useState(false);

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
            setIsLogin(true);
          })
          .catch(function (error) {
            console.log(error);
            setErr(true);
          });
      },
    });

  const navigation = useCallback(() => {
    history.push("/signup");
  }, []);

  if (isLogin) {
    return <Redirect to={"/main"} />;
  }

  return (
    <div className={"loginWrapper"}>
      <AppHeader>Hi! I'm Todooster!</AppHeader>
      <form onSubmit={handleSubmit}>
        <div className={"input_container"}>
          <div className={"inputWrappeer"}>
            {err ? <span>Sign up, please</span> : null}
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
          <Button className={"buttonLogin"} type={"submit"}>
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
