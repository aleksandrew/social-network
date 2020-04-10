// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

// local dependencies
import Dialog from './Dialog';
import styles from './Message.module.scss';


const Message = memo((props) => {
    const cx = classNames.bind(styles);
    const { isMarkRead, messages } = props;

    return (

        <main className={cx('container', styles.message)}>
            <section className={cx('block', styles.messageBlock)}>
                <div className={cx(styles.elem, styles.elemTop)}>
                    <Nav className={cx(styles.messageKeyboard)}>
                        <NavItem className={cx()}>
                            <NavLink className={cx(styles.messageKeyboardRight)} to="/undefined">
                                Recent
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={cx(styles.messageKeyboardRight)} to="/undefined">
                                Message Requests
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className={cx(styles.messageKeyboard)}>
                        <NavItem className={cx()}>
                            <NavLink className={cx(styles.messageKeyboardLeft)} to="/undefined">
                                New Group
                            </NavLink>
                        </NavItem>
                        <NavItem className={cx()}>
                            <NavLink className={cx(styles.messageKeyboardLeft)} to="/undefined">
                                New Message
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <Nav className={cx(styles.messageList)}>
                    {
                        _.map(messages, (user) => (
                            <Dialog key={user.id} {...user} isMarkRead={isMarkRead}/>
                        ))
                    }
                </Nav>
            </section>
        </main>
    );
});

Message.propTypes = {
    messages: PropTypes.array.isRequired,
    isMarkRead: PropTypes.func.isRequired,
};

export default Message;
