// outsource dependencies
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { memo, useEffect, useState, useCallback } from 'react';

// local dependencies
import Avatar from '../../../components/avatar';
import styles from './profileHeader.module.scss';
import cover from '../../../images/icon/cover.jpg';


const ProfileHeader = memo((props) => {
    const cx = classNames.bind(styles);
    const { profile, isOwner, savePhoto, updateStatus, status } = props;

    const [editMode, setEditMode] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const [changedStatus, setChangeStatus] = useState(status);

    useEffect(() => setChangeStatus(status), [status]);

    const activateEditMode = useCallback(() => setEditMode(true), [setEditMode]);
    const onStatusChange = useCallback((e) => setChangeStatus(e.currentTarget.value), [setChangeStatus]);

    const deactivateEditMode = useCallback(() => {
        setEditMode(false);
        updateStatus(changedStatus);
    }, [setEditMode, updateStatus, changedStatus]);

    const onMainPhotoSelected = useCallback((e) => {
        const files = e.target.files;

        if (files.length) {
            savePhoto(files[0]);
        }
    }, [savePhoto]);

    return (
        <section className={cx(styles.Info, styles.Block)}>
            <div className={styles.InfoTop}>
                <div className={styles.Cover}>
                    {
                        isOwner && <div className={styles.CoverChange}>
                            <input id="changePhoto" className={styles.CoverChangeInput} type="file"
                                onChange={onMainPhotoSelected}/>
                            <label htmlFor="changePhoto" className={styles.CoverChangeLabel}>
                                change image
                            </label>
                        </div>
                    }
                    <img alt={profile.fullName} src={profile.photos.large || cover}/>
                </div>
                <div className={styles.InfoDesc}>
                    {
                        isOwner && <div>
                            <input id="changePhoto" className={styles.InfoCircleChangeInput} type="file"
                                onChange={onMainPhotoSelected}/>
                            <label htmlFor="changePhoto" className={styles.InfoCircleChangeLabel}>
                                change image
                            </label>
                        </div>
                    }
                    <div className={styles.InfoCircle}>
                        <Avatar width="158" height="158" src={profile.photos.small} borderRadius={true}/>
                    </div>
                    <div className={styles.Desc}>
                        <h2 className={styles.DescFullName}>
                            {profile.fullName}
                        </h2>
                        {isOwner
                            ? (
                                <div title="Edit status"
                                    className={cx(styles.DescStatus, { DescStatusWidth: editMode })}
                                    onMouseEnter={() => setMouseOver(true)}
                                    onMouseLeave={() => setMouseOver(false)}>
                                    {
                                        !editMode && <span onDoubleClick={activateEditMode}>
                                            {changedStatus || 'no status'}
                                        </span>
                                    }
                                    {
                                        editMode && <input autoFocus={true}
                                            value={changedStatus}
                                            onChange={onStatusChange}
                                            onBlur={deactivateEditMode}
                                            className={styles.StatusEditField}/>
                                    }
                                    {
                                        !editMode && mouseOver && <div onClick={activateEditMode}
                                            className={styles.DescStatusEdit}/>
                                    }
                                </div>
                            )
                            : (
                                <div title="Edit status"
                                    className={cx(styles.DescStatus)}
                                >
                                    <span>
                                        {changedStatus || 'no status'}
                                    </span>
                                </div>
                            )}
                    </div>
                </div>
            </div>
            <div className={styles.InfoBottom}/>
        </section>
    );
});

ProfileHeader.propTypes = {
    status: PropTypes.string,
    profile: PropTypes.object,
    isOwner: PropTypes.bool.isRequired,
    savePhoto: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired,
};

ProfileHeader.defaultProps = {
    status: '',
    profile: {},
};

export default ProfileHeader;
