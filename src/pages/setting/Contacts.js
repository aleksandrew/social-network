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


const Contacts = memo((props) => {
    const cx = classNames.bind(styles);
    const { handleSubmit, submitting, updateData, userId } = props;

    const onSubmit = useCallback((data) => {
        updateData(data, userId);
    }, [updateData, userId]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={cx(styles.formContacts)}>
                <legend><h3 className={cx('d-md-inline d-none')}>Contacts</h3></legend>
                <Field type="url"
                    component={Input}
                    label="My website"
                    name="website"
                    classNameLabel={cx(styles.label)}
                    classNameInput={cx(styles.input)}
                    classNameContainer={cx(styles.fieldContainer)}
                    placeholder="please enter your website adress"
                />
                <Field type="url"
                    component={Input}
                    label="My contact"
                    name="mainLink"
                    classNameLabel={cx(styles.label)}
                    classNameInput={cx(styles.input)}
                    classNameContainer={cx(styles.fieldContainer)}
                    placeholder="please enter your contact adress"
                />
                <Field type="url"
                    component={Input}
                    label="My github account"
                    name="github"
                    classNameLabel={cx(styles.label)}
                    classNameInput={cx(styles.input)}
                    classNameContainer={cx(styles.fieldContainer)}
                    placeholder="please enter your github account"
                />
                <Field type="url"
                    component={Input}
                    label="My facebook account"
                    name="facebook"
                    classNameLabel={cx(styles.label)}
                    classNameInput={cx(styles.input)}
                    classNameContainer={cx(styles.fieldContainer)}
                    placeholder="please enter your facebook account"
                />
                <Field type="url"
                    component={Input}
                    label="My vk account"
                    name="vk"
                    classNameLabel={cx(styles.label)}
                    classNameInput={cx(styles.input)}
                    placeholder="please enter your vk account"
                    classNameContainer={cx(styles.fieldContainer)}
                />
                <Field type="url"
                    component={Input}
                    label="My twitter account"
                    name="twitter"
                    classNameLabel={cx(styles.label)}
                    classNameInput={cx(styles.input)}
                    classNameContainer={cx(styles.fieldContainer)}
                    placeholder="please enter your twitter account"
                />
                <Field type="url"
                    component={Input}
                    label="My instagram account"
                    name="instagram"
                    classNameLabel={cx(styles.label)}
                    classNameInput={cx(styles.input)}
                    classNameContainer={cx(styles.fieldContainer)}
                    placeholder="please enter your instagram account"
                />
                <Field type="url"
                    component={Input}
                    label="My youtube account"
                    name="youtube"
                    classNameLabel={cx(styles.label)}
                    classNameInput={cx(styles.input)}
                    classNameContainer={cx(styles.fieldContainer)}
                    placeholder="please enter your youtube account"
                />
            </fieldset>
            <button className={cx('btn', styles.button)}
                type="submit" disabled={submitting}>
                Update data
            </button>
        </form>
    );
});

Contacts.propTypes = {
    userId: PropTypes.string,
    updateData: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

Contacts.defaultProps = {
    userId: '',
};

export default connect(
    // mapStateToProps
    (state) => ({
        userId: state.auth.userId,
        initialValues: { ...JSON.parse(localStorage.getItem('primeryProfile'))[0].contacts },
    }),
    // mapDispatchToProps
    (dispatch) => ({
        updateData: (data, userId) => dispatch({ type: PROFILE.UPDATE_DATA, data, userId }),
    }),
)(reduxForm({
    form: 'contacts',
    enableReinitialize: true,
})(Contacts));
