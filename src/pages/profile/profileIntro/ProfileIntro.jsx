import React from 'react';
import style from './ProfileIntro.module.scss';

const ProfileIntro = props => {

  const {aboutMe, lookingForAJob, lookingForAJobDescription} = props.profile;

  return <section className={`${style.Intro} ${style.Block}`}>
    <h3 className={`${style.IntroDesc} ${style.IntroDescTitle} `}>
      Intro
    </h3>
    <div className={`${style.IntroDesc} ${style.IntroDescInfo} `}>
      <b>About me:</b> {aboutMe
      ? aboutMe
      : `lorem lorem lorem lorem`}
    </div>
    <div className={`${style.IntroDesc} ${style.IntroDescIsWork} `}>
      {lookingForAJob
        ? `I'm looking for job`
        : `I'm not looking for job now`}
    </div>
    {lookingForAJobDescription && <div className={`${style.IntroDesc} ${style.IntroDescWork} `}>
      {lookingForAJobDescription}
    </div>}
    <div className={`${style.IntroDesc}`}>
      {/*<span>My contacts</span>*/}
      {/*<ul>*/}
      {/*<li>*/}
      {/**/}
      {/*</li>*/}
      {/*</ul>*/}
    </div>
  </section>
};

export default ProfileIntro;
