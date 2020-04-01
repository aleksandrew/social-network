// outsource dependencies
import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

// local dependencies
import LoginForm from './LoginForm';
import styles from './login.module.scss';
import Avatar from '../../components/avatar';

export const ModalAccount = React.memo((props) => {
    const cx = classNames.bind(styles);
    const { profile, showModal, setShowModal } = props;

    return (
        <Modal
            isOpen={showModal}
            ariaHideApp={false}
            onRequestClose={() => setShowModal(false)}
            overlayClassName={styles.overlay}
            className={cx(styles.modal, styles.modal__account)}
            contentLabel="Account Modal"
        >
            <div className={styles.avatar}>
                <Avatar width="160" height="160" src={null}/>
                <h3 className={cx(styles.modalTitle, styles.modalTitle__account)}>
                    {profile.name}
                </h3>
            </div>
            <LoginForm modal={true}
                checkbox={true}
                profile={profile}
            />
            <button title="Close modal"
                className={styles.modalClose}
                onClick={() => setShowModal(false)}
            >
                ×
            </button>
            <a className={styles.modalLink} href="/#">Sign Up?</a>
        </Modal>
    );
});

ModalAccount.propTypes = {
    showModal: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    setShowModal: PropTypes.func.isRequired,
};

export const ModalLogin = React.memo((props) => {
    const { showModal, setShowModal } = props;

    return (
        <Modal
            isOpen={showModal}
            ariaHideApp={false}
            onRequestClose={() => setShowModal(false)}
            overlayClassName={styles.overlay}
            className={styles.modal}
            contentLabel="Login Modal"
        >
            <h3 className={styles.modalTitle}>Log Into Facebook</h3>
            <LoginForm modal={true} checkbox={true}/>
            <button title="Close modal"
                onClick={() => setShowModal(false)}
                className={styles.modalClose}>
                ×
            </button>
            <a className={styles.modalLink} href="/#">Sign Up?</a>
        </Modal>
    );
});

ModalLogin.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
};
