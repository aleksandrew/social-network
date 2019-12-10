import React from 'react';
import {Field, reduxForm} from 'redux-form';
import style from './Login.module.scss';
import {Input} from "../../components/formsControl/FormControl";
import {validate} from "../../utils/validators";
import {login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const LoginForm = ({handleSubmit, error, submitting}) => {

  return <form onSubmit={handleSubmit}>
    <div>
      <Field type={"text"} placeholder={"Email"} name={"email"} component={Input}/>
    </div>
    <div>
      <Field type={"password"} placeholder={"Password"} name={"password"} component={Input}/>
    </div>
    <div>
      <Field type={"checkbox"} name={"rememberMe"} component={"input"}/>
      remember me
    </div>
    {
      error && <div className={style.formSummuryError}>
        {error}
      </div>
    }
    <div>
      <button type="submit" disabled={submitting}>Login</button>
    </div>
  </form>
};

const LoginRedaxForm = reduxForm({form: 'login', validate})(LoginForm);

const Login = props => {

  const onSubmit = formData => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }

  return <fieldset>
    <legend>Login</legend>
    <LoginRedaxForm onSubmit={onSubmit}/>
  </fieldset>
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);
