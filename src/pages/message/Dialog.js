// outsource dependencies
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavItem, NavLink } from 'reactstrap';
import React, { memo, useCallback } from 'react';

// local dependencies
import styles from './Message.module.scss';
import Avatar from '../../components/avatar';
import { currentDate } from '../../components/time';


const Dialog = memo((props) => {
    const cx = classNames.bind(styles);
    const { messages, href, img, name, id, isMarkRead } = props;

    const todaysDate = useCallback(() => currentDate.getDate(), []);
    const isRead = useCallback((e) => {
        e.preventDefault();
        isMarkRead(e.target.id);
    }, [isMarkRead]);

    return (
        <NavItem className={cx(styles.messageItem, {
            [styles.messageItemUnread]: !messages[messages.length - 1].read,
        })}>
            <NavLink className={cx(styles.messageLink)} href={href || '/undefined'}>
                <div className={cx(styles.messageImg)}>
                    <Avatar width="50" height="50" borderRadius={true} src={img || null}/>
                </div>
                <div className={cx(styles.messageDesc)}>
                    <div className={cx(styles.messageInfo)}>
                        <h2 className={cx(styles.messageInfoTitle)}>
                            {name}
                        </h2>
                        <p className={cx(styles.messageInfoText, {
                            [styles.messageInfoTextReceived]: messages[messages.length - 1].sendMessage,
                        })}>
                            {messages[messages.length - 1].message}
                        </p>
                    </div>
                    <div className={cx(styles.messageDate)}>
                        <p>
                            {
                                todaysDate === messages[messages.length - 1].date
                                    ? messages[messages.length - 1].time
                                    : messages[messages.length - 1].date
                            }
                        </p>
                        <div id={id}
                            onClick={isRead}
                            title={
                                messages[messages.length - 1].read
                                    ? 'Mark as Read'
                                    : 'Mark as Unread'
                            }
                            className={cx(styles.messageMark, {
                                [styles.messageMarkUnread]: !messages[messages.length - 1].read,
                            })}
                        />
                    </div>
                </div>
            </NavLink>
        </NavItem>
    );
});

Dialog.propTypes = {
    img: PropTypes.string,
    href: PropTypes.string,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    isMarkRead: PropTypes.func.isRequired,
};

Dialog.defaultProps = {
    img: '',
    href: '',
};

export default Dialog;
