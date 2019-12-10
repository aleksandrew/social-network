import React from 'react';
import '../../style/_base.scss';
import style from "./Users.module.scss";
import {NavLink} from "react-router-dom";
import Ava from "../../components/ava/Ava";

const Users = React.memo(props => {

  const {users, currentPage, totalUsersCount, pageSize, unfollow, follow, followingInProgress, onPageChanged} = props;

  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];
  let paginator = false;

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  if (currentPage < 4) {
    paginator = pages.slice(0, 5);
  }
  else if (currentPage > pages.length - 3) {
    paginator = pages.slice(pages.length - 5);
  }
  else {
    paginator = pages.slice(currentPage - 3, currentPage + 2);
  }


  return <main className={`${style.Users}`}>
    <section className={`${style.Block} ${style.PossibleAcquaintances}`}>
      <div className={`${style.Header}`}>
        <h2 className={`${style.HeaderTitle}`}>
          People You May Know
        </h2>
      </div>
      <ul className={`${style.List}`}>
        {
          users.map((user, i) => {

            return <li key={i} className={`${style.Item}`}>
              <div className={`${style.Info}`}>
                <div className={`${style.Photos}`}>
                  {user.photos.small === null
                    ? <Ava width={'75'} height={'75'} border={'0'} src={user.photos.small}/>
                    : <Ava width={'75'} height={'75'} border={'0'}/>}
                </div>
                <div className={`${style.Title}`}>
                  <NavLink className={`${style.Username}`}
                           to={`/profile/${user.id}`}>
                    {/*// to={`/profile/`}>*/}
                    {user.name}
                  </NavLink>
                  <div className={`${style.Status}`}>{user.status}</div>
                </div>
              </div>
              <div className={`${style.Keyboard}`}>
                {user.followed
                  ? <button className={`btn ${style.Button} ${style.Unfollow}`}
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                              follow(user.id)
                            }}>
                  Remove Friend
                </button>
                  : <button className={`btn ${style.Button} ${style.Follow}`}
                            disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                              unfollow(user.id)
                            }}>
                    Add Friend
                  </button>
                }
                <button className={`btn ${style.Remove}`}>
                  Remove
                </button>
              </div>
            </li>
          })
        }
      </ul>
      <div>
        {
          currentPage > 3 && <span className={`${style.pages}`}
                                   onClick={() => onPageChanged(1)}>
                  1
                </span>
        }
        {
          paginator.map(page => {
            return (
              <span className={`${style.pages} ${currentPage === page && style.selectedPages}`}
                    onClick={() => onPageChanged(page)}>
                {page}
                </span>
            )
          })
        }
        {
          currentPage < pages.length - 2 &&
          <span className={`${style.pages}`}
                onClick={() => onPageChanged(pages.length)}>
                  {pages.length}
                  </span>
        }
      </div>
    </section>
  </main>
});

export default Users;
