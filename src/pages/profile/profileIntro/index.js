// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { Nav, NavItem, NavLink } from 'reactstrap';

// local dependencies
import styles from './profileIntro.module.scss';
import replacer from '../../../components/repalcer';

const ProfileIntro = memo((props) => {
    const cx = classNames.bind(styles);
    const { aboutMe, lookingForAJob, lookingForAJobDescription, contacts } = props;
    const { facebook, website, vk, twitter, instagram, youtube, github, mainLink } = contacts;

    return (
        <section className={cx(styles.Intro, styles.Block)}>
            <h3 className={cx(styles.IntroDesc, styles.IntroDescTitle)}>
                Intro
            </h3>
            {
                aboutMe && <div className={cx(styles.IntroDesc, styles.IntroDescInfo)}>
                    <b>About me:</b>
                    <br/>
                    {aboutMe}
                </div>
            }
            <div className={cx(styles.IntroDesc, styles.IntroDescIsWork)}>
                {
                    lookingForAJob
                        ? 'I\'m looking for job'
                        : 'I\'m not looking for job now'
                }
            </div>
            {
                lookingForAJobDescription && <div className={cx(styles.IntroDesc, styles.IntroDescWork)}>
                    {lookingForAJobDescription}
                </div>
            }
            {
                _.find(Object.keys(contacts), (link) => contacts[link]) && <div className={styles.IntroDesc}>
                    <span>My contacts:</span>
                    <Nav className={cx(styles.contactList)}>
                        {
                            github && (
                                <NavItem title="GitHub" className={cx(styles.contactItem)}>
                                    <NavLink target="_blank"
                                        href={replacer(github)}
                                        className={cx(styles.contactLink)}
                                    >
                                        <div className={cx(styles.IntroDescGh)}/>
                                    </NavLink>
                                </NavItem>
                            )
                        }
                        {
                            website && (
                                <NavItem title="Web site" className={cx(styles.contactItem)}>
                                    <NavLink target="_blank"
                                        href={replacer(website)}
                                        className={cx(styles.contactLink)}
                                    >
                                        <div className={cx(styles.IntroDescWeb)}/>
                                    </NavLink>
                                </NavItem>
                            )
                        }
                        {
                            mainLink && (
                                <NavItem title={mainLink} className={cx(styles.contactItem)}>
                                    <NavLink target="_blank"
                                        href={replacer(mainLink)}
                                        className={cx(styles.contactLink)}
                                    >
                                        <div className={cx(styles.IntroDescLink)}/>
                                    </NavLink>
                                </NavItem>
                            )
                        }
                        {
                            facebook && (
                                <NavItem title="Facebook" className={cx(styles.contactItem)}>
                                    <NavLink target="_blank"
                                        href={replacer(facebook)}
                                        className={cx(styles.contactLink)}
                                    >
                                        <div className={cx(styles.IntroDescFb)}/>
                                    </NavLink>
                                </NavItem>
                            )
                        }
                        {
                            vk && (
                                <NavItem title="Vkontakte" className={cx(styles.contactItem)}>
                                    <NavLink target="_blank"
                                        href={replacer(vk)}
                                        className={cx(styles.contactLink)}
                                    >
                                        <div className={cx(styles.IntroDescVk)}/>
                                    </NavLink>
                                </NavItem>
                            )
                        }
                        {
                            instagram && (
                                <NavItem title="Instagram" className={cx(styles.contactItem)}>
                                    <NavLink target="_blank"
                                        href={replacer(instagram)}
                                        className={cx(styles.contactLink)}
                                    >
                                        <div className={cx(styles.IntroDescInst)}/>
                                    </NavLink>
                                </NavItem>
                            )
                        }
                        {
                            twitter && (
                                <NavItem title="Twitter" className={cx(styles.contactItem)}>
                                    <NavLink target="_blank"
                                        href={replacer(twitter)}
                                        className={cx(styles.contactLink)}
                                    >
                                        <div className={cx(styles.IntroDescTw)}/>
                                    </NavLink>
                                </NavItem>
                            )
                        }
                        {
                            youtube && (
                                <NavItem title="Youtobe" className={cx(styles.contactItem)}>
                                    <NavLink target="_blank"
                                        href={replacer(youtube)}
                                        className={cx(styles.contactLink)}
                                    >
                                        <div className={cx(styles.IntroDescYb)}/>
                                    </NavLink>
                                </NavItem>
                            )
                        }
                    </Nav>
                </div>
            }
        </section>
    );
});

ProfileIntro.propTypes = {
    vk: PropTypes.string,
    github: PropTypes.string,
    aboutMe: PropTypes.string,
    website: PropTypes.string,
    twitter: PropTypes.string,
    youtube: PropTypes.string,
    facebook: PropTypes.string,
    contacts: PropTypes.object,
    mainLink: PropTypes.string,
    instagram: PropTypes.string,
    lookingForAJob: PropTypes.bool,
    lookingForAJobDescription: PropTypes.string,
};

ProfileIntro.defaultProps = {
    vk: '',
    github: '',
    aboutMe: '',
    website: '',
    twitter: '',
    youtube: '',
    facebook: '',
    contacts: {},
    mainLink: '',
    instagram: '',
    lookingForAJob: false,
    lookingForAJobDescription: '',
};

export default ProfileIntro;
