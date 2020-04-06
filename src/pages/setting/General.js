// outsource dependencies
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Field, reduxForm } from 'redux-form';
import React, { memo, useCallback } from 'react';

// local dependencies
import styles from './setting.module.scss';
import { PROFILE } from '../../constans/types';
import Input from '../../components/input/index';
import { Checkbox } from '../../components/checkbox';


const General = memo((props) => {
    const cx = classNames.bind(styles);
    const { handleSubmit, submitting, updateData, userId } = props;

    const onSubmit = useCallback((data) => {
        updateData(data, userId);
    }, [updateData, userId]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={cx(styles.formContacts)}>
                <h3 className={cx('d-md-inline d-none')}>General</h3>
                <Field type="text"
                    name="fullName"
                    label="Full name"
                    component={Input}
                    classNameLabel={cx(styles.label)}
                    classNameInput={cx(styles.input)}
                    disabled={true}
                    classNameContainer={cx(styles.fieldContainer)}
                />
                <fieldset className={cx(styles.formJob)}>
                    <Field component={Checkbox}
                        name="lookingForAJob"
                        label="looking for a job"
                        classNameLabel={cx(styles.labelCheckbox)}
                    />
                    <Field type="textarea"
                        component={Input}
                        label="For a job description"
                        name="lookingForAJobDescription"
                        classNameLabel={cx(styles.label)}
                        classNameInput={cx(styles.input)}
                        placeholder="please enter description"
                        classNameContainer={cx(styles.fieldContainer)}
                    />
                </fieldset>
                <Field name="aboutMe"
                    type="textarea"
                    label="About me"
                    component={Input}
                    classNameLabel={cx(styles.label)}
                    classNameInput={cx(styles.input)}
                    placeholder="please tell about yourself"
                    classNameContainer={cx(styles.fieldContainer)}
                />
                <button className={cx('btn', styles.button)}
                    type="submit" disabled={submitting}>
                    Update data
                </button>
            </fieldset>
        </form>
    );
});

General.propTypes = {
    userId: PropTypes.number,
    submitting: PropTypes.bool.isRequired,
    updateData: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

General.defaultProps = {
    userId: null,
};

export default connect(
    // mapStateToProps
    (state) => ({
        userId: state.auth.userId,
        initialValues: JSON.parse(localStorage.getItem('primeryProfile'))[0],
    }),
    // mapDispatchToProps
    (dispatch) => ({
        updateData: (data, userId) => dispatch({ type: PROFILE.UPDATE_DATA, data, userId }),
    }),
)(reduxForm({
    form: 'general',
    enableReinitialize: true,
    validate: (values) => {
        const errors = {};

        if (!values.fullName) {
            errors.fullName = 'Required';
        } else if (values.fullName.length > 40) {
            errors.fullName = 'Must be 40 characters or less';
        }

        if (!values.lookingForAJobDescription) {
            errors.lookingForAJobDescription = 'Required';
        }

        if (!values.aboutMe) {
            errors.aboutMe = 'Required';
        }

        return errors;
    },
})(General));
