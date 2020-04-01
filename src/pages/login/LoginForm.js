// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { Field, reduxForm } from 'redux-form';

// local dependencies
import { connect } from 'react-redux';
import styles from './login.module.scss';
import Input from '../../components/input';
import { AUTH } from '../../constans/types';
import { Checkbox } from '../../components/checkbox';
import { selector as appSelector } from '../../redusers/app-reducer';
import { selector as authSelector } from '../../redusers/auth-reducer';


const LoginForm = memo((props) => {
    const cx = classNames.bind(styles);
    const { handleSubmit, errorMessages, submitting, modal, checkbox, emailStyle, login } = props;


    return (
        <form className={styles.formLine} onSubmit={handleSubmit(login)}>
            <Field type="text"
                name="email"
                placeholder="Email"
                component={Input}
                style={{ ...emailStyle }}
                classNameInput={cx(styles.formInput)}
                classNameLabel={cx({ formInputModal: modal })}
            />
            <Field name="password"
                component={Input}
                placeholder="Password"
                type={modal ? 'hidden' : 'password'}
                classNameInput={cx(styles.formInput)}
                classNameLabel={cx({ formInputModal: modal })}
            />
            {
                checkbox && (
                    <Field name="rememberMe"
                        classNameInput={styles.checkbox}
                        classNameLabel={styles.checkboxLabel}
                        label="Remember password" component={Checkbox}
                    />
                )
            }
            {
                errorMessages && <div className={styles.formSummuryError}>
                    {errorMessages}
                </div>
            }
            <div>
                <button className={cx('btn', styles.formBtn, { formBtnModal: modal })}
                    type="submit" disabled={submitting}>
                    Log In
                </button>
            </div>
        </form>
    );
});

LoginForm.propTypes = {
    modal: PropTypes.bool,
    checkbox: PropTypes.bool,
    emailStyle: PropTypes.object,
    errorMessages: PropTypes.string,
    login: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
    modal: false,
    emailStyle: {},
    errorMessages: '',
    checkbox: false,
};

export default connect(
    // mapStateToProps
    (state) => ({
        initialValues: authSelector(state).test,
        errorMessages: appSelector(state).errorMessages,
    }),
    // mapDispatchToProps
    (dispatch) => ({
        login: (payload) => dispatch({ type: AUTH.LOGIN, ...payload }),
    }),
)(reduxForm({
    form: 'login',
    enableReinitialize: true,
    validate: (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (values.email.length > 40) {
            errors.email = 'Must be 40 characters or less';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length > 20) {
            errors.password = 'Must be 20 characters or less';
        } else if (values.password.length < 4) {
            errors.password = 'Must be 4 characters or more';
        }

        return errors;
    },
})(LoginForm));
