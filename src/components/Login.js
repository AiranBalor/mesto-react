import React from "react";
import AuthorizationForm from "./AuthorizationForm";

function Login({ onLogin }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let { email, password } = data;
    onLogin(email, password);
  }

  return (
    <AuthorizationForm
      title={"Вход"}
      text={"Войти"}
      active={""}
      onSubmit={handleSubmit}
    >
      <label>
        <input
          type="email"
          value={data.email}
          className="authorization__item auth__item_type_email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
          minLength="4"
          maxLength="40"
        />
        <span id="email-error" className="authorization__error"></span>
      </label>
      <label>
        <input
          type="password"
          value={data.password}
          className="authorization__item auth__item_type_password"
          name="password"
          onChange={handleChange}
          placeholder="Пароль"
          required
          minLength="8"
          maxLength="20"
        />
        <span id="password-error" className="authorization__error"></span>
      </label>
    </AuthorizationForm>
  );
}

export default Login;
