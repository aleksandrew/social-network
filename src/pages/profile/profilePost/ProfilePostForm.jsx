import React from 'react';
import style from './ProfilePost.module.scss';
import {Field, reduxForm} from "redux-form";
import {validate} from "../../../utils/validators";
import {TextareaPost as renderField} from "../../../components/formsControl/FormControl";
import Ava from "../../../components/ava/Ava";

const ProfilePostForm = props => {
  const {handleSubmit, submitting, pristine} = props;

  return <form className={`${style.Block} ${style.FieldCreatedPost}`} onSubmit={handleSubmit}>
    <div className={`${style.FieldCreatedPostForm}`}>
      <div className={style.FieldCreatedPostAvaBorder}>
        <Ava width={"38"} height={"38"}/>
      </div>
      <Field className={style.FieldCreatedPostTextarea}
             name={"newPostBody"} component={renderField}
             label={"What`s on your mind?"}/>
    </div>
    <button type="submit" disabled={pristine || submitting} className={`${style.Button} ${pristine && style.ButtonValidate}`}>Post</button>
  </form>
};

const ProfilePostFormRedux = reduxForm({form: "profileAddPostForm", validate})(ProfilePostForm);

export default ProfilePostFormRedux;


