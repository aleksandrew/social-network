// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { Field, reduxForm } from 'redux-form';

// local dependencies
import Input from '../../../components/input';
import styles from './profilePost.module.scss';
import Avatar from '../../../components/avatar';

let ProfilePostForm = memo((props) => {
    const cx = classNames.bind(styles);
    const { handleSubmit, submitting, pristine, photos } = props;

    return (
        <form className={cx(styles.Block, styles.FieldCreatedPost)} onSubmit={handleSubmit} >
            <div className={styles.FieldCreatedPostForm} >
                <div className={styles.FieldCreatedPostAvaBorder} >
                    <Avatar width="38" height="38" src={photos} borderRadius={true} />
                </div>
                <Field type="textarea"
                    component={Input}
                    name="newPostBody"
                    placeholder="What`s on your mind?"
                    style={{ resize: 'vertical', minHeight: 100 }}
                    classNameInput={styles.FieldCreatedPostTextarea}
                    classNameContainer={styles.FieldCreatedPostContainer}
                />
            </div>
            <button type="submit" disabled={pristine || submitting}
                className={cx(styles.Button, { ButtonValidate: pristine })} >
        Post
            </button>
        </form>
    );
});

ProfilePostForm.propTypes = {
    photos: PropTypes.string,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

ProfilePostForm.defaultProps = {
    photos: '',
};

ProfilePostForm = reduxForm({
    form: 'profileAddPostForm',
    validate: (values) => {
        const errors = {};

        if (values.newPostBody && values.newPostBody.length > 110) {
            errors.newPostBody = 'Must be 110 characters or less!';
        }

        return errors;
    },
})(ProfilePostForm);

export default ProfilePostForm;
