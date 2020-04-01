// outsource dependencies
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import React, { memo, useState } from 'react';

// local dependencies
import LoginForm from './LoginForm';
import { ModalAccount } from './Modals';
import styles from './login.module.scss';
import Footer from '../../common/footer';
import Avatar from '../../components/avatar';
import { selector as authSelector } from '../../redusers/auth-reducer';


const Login = memo(() => {
    const cx = classNames.bind(styles);

    // state
    const test = useSelector((state) => authSelector(state).test);
    const isAuth = useSelector((state) => authSelector(state).isAuth);

    // local state
    // const [showModalLogin, setShowModalLogin] = useState(false);
    const [showModalAccount, setShowModalAccount] = useState(false);

    if (isAuth) {
        return <Redirect to={'/profile'}/>;
    }

    return (
        <section className="wrapper">
            <div className={cx('content', styles.topBlock)}>
                <div className="container">
                    {/* <ModalLogin showModal={showModalLogin} setShowModal={setShowModalLogin} */}
                    {/* onSubmit={onSubmit} />*/}
                    <div className={cx(styles.loginBlock, {
                        loginBlockDisable: showModalAccount,
                    })}>
                        <div>
                            <div className={styles.logo}/>
                            <h2 className={styles.title}>Recent Logins</h2>
                            <p className={styles.desc}>Click your picture or add an account.</p>
                            <ul className={styles.list}>
                                <ModalAccount profile={test}
                                    showModal={showModalAccount}
                                    setShowModal={setShowModalAccount}
                                />
                                <li title={test.name}
                                    className={cx('btn', styles.item)}
                                    onClick={() => setShowModalAccount(true)}
                                >
                                    <div className={styles.itemBlock}>
                                        <Avatar width="160" height="160"
                                            style={{ borderRadius: '5px 5px 0 0' }} src={null}/>
                                        <div className={styles.itemBlockDesc}>
                                            {test.name}
                                        </div>
                                    </div>
                                </li>
                                {/* <li onClick={() => setShowModalLogin(true)} title="Add Account" */}
                                {/* className={cx("btn", styles.item, styles.item__add)}>*/}
                                {/* <div className={cx(styles.itemBlock, styles.itemBlock__add)}>*/}
                                {/* <div className={styles.itemAddBlock}/>*/}
                                {/* <div className={styles.itemBlockDesc}>*/}
                                {/* Add Account*/}
                                {/* </div>*/}
                                {/* </div>*/}
                                {/* </li>*/}
                            </ul>
                        </div>
                        <div>
                            <div className={cx(styles.blockForm)}>
                                <LoginForm />
                                <button className={cx('btn', styles.logBtn)}>Create New Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    );
});

export default Login;
