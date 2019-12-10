import React from 'react';
import style from './Ava.module.scss';
import user from '../../images/user.svg';

const Ava = ({width, height, url = user, border = 50}) => {
console.log(url)
  return (
    <div style={{width:`${width}px`, height:`${height}px`}}
         className={`${style.Img} ${border === 50 && style.ImgBorderRadius}`}>
      <img src={url}/>
    </div>
  )
};

export default Ava;
