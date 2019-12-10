import React from 'react';
import style from './Profile.module.scss';
import ProfileHeader from "./profileHeader/ProfileHeader";
import ProfileIntro from "./profileIntro/ProfileIntro";
import ProfilePostContainer from "./profilePost/ProfilePostContainer";
import Preloader from "../../components/preloader/Preloader";

const Profile = ({profile, status, updateStatus}) => {

  if (!profile) {
    return <Preloader />
  }

  return <main className={style.Main}>
    <ProfileHeader profile={profile}
                   status={status}
                   updateStatus={updateStatus}/>
    <div className={style.Bottom}>
      <ProfileIntro profile={profile}/>
      <ProfilePostContainer />
    </div>
  </main>
};

export default Profile;
