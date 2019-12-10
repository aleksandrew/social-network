import React from "react";
import style from "./FormControl.module.scss";

export const TextareaPost = props => {

  const {input, label, type, meta: {error}, className} = props;

  const hasError = error;

  return <>
    <textarea className={`${className} ${hasError ? style.errorTextarea : ""}`} {...input} placeholder={label}/>
    {hasError && <div className={style.errorBlock}>{error}</div>}
  </>
};

export const Textarea = props => {

  const {input, label, type, meta: {touched, error}, className} = props;

  const hasError = touched && error;

  return <>
    <textarea className={`${className} ${hasError ? style.errorTextarea : ""}`} {...input} placeholder={label}/>
    {hasError && <span className={style.errorSpan}>{error}</span>}
  </>
};

export const Input = props => {

  const {input, label, type, meta: {touched, error}} = props;

  const hasError = touched && error;

  return <div>
    <input type={type} className={hasError ? style.errorTextarea : ""} {...input} placeholder={label}/>
    {hasError && <span className={style.errorSpan}>{error}</span>}
  </div>
};
