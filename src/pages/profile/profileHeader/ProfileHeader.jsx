import React, {useEffect, useState} from 'react';
import style from './ProfileHeader.module.scss';
import cover from '../../../images/cover.jpg';
import Ava from "../../../components/ava/Ava";

const ProfileHeader = props => {

  const {profile, updateStatus} = props;

  const [editMode, setEditMode] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(status);
  };

  const onStatusChange = e => {
    setStatus(e.currentTarget.value)
  };

  return <section className={`${style.Info} ${style.Block}`}>
    <div className={style.InfoTop}>
      <div className={style.Cover}>
        <img src={cover}/>
      </div>
      <div className={style.InfoDesc}>
        <div className={style.InfoCircle}>
          <Ava width={"158"} height={"158"}/>
        </div>
        <div className={style.Desc}>
          <h2 className={style.DescFullName}>
            {profile.fullName}
          </h2>
          <div title={"Edit status"}
               className={`${style.DescStatus} ${editMode && style.DescStatusWidth}`}
               onMouseEnter={() => setMouseOver(true)}
               onMouseLeave={() => setMouseOver(false)}>
            {!editMode && <span onDoubleClick={activateEditMode}>
                {status || "no status"}
                </span>}
            {editMode && <input onChange={onStatusChange}
                                onBlur={deactivateEditMode}
                                autoFocus={true} value={status}
                                className={style.StatusEditField}/>}
            {!editMode && mouseOver && <div onClick={activateEditMode}
                                            className={style.DescStatusEdit}/>}
          </div>
        </div>
      </div>
    </div>
    <div className={style.InfoBottom}/>
  </section>
};

export default ProfileHeader;
