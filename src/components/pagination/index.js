// outsource dependencies
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

// local dependencies
import '../../style/_base.scss';
import styles from './pagination.module.scss';

const Pagination = memo((props) => {
    const cx = classNames.bind(styles);
    const { currentPage, totalUsersCount, pageSize, onPageChanged } = props;

    let paginator;
    const pages = [];
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    if (currentPage < 4) {
        paginator = pages.slice(0, 5);
    } else if (currentPage > pages.length - 3) {
        paginator = pages.slice(pages.length - 5);
    } else {
        paginator = pages.slice(currentPage - 3, currentPage + 2);
    }

    return <ul className={styles.list}>
        {
            currentPage > 3
            && <li onClick={() => onPageChanged(1)}
                className={cx('btn', styles.pages, {
                    selectedPage: currentPage === 1,
                })}
            >
                1
            </li>
        }
        {
            paginator.map((page) => (
                <li key={page}
                    onClick={() => onPageChanged(page)}
                    className={cx('btn', styles.pages, {
                        selectedPage: currentPage === page,
                    })}
                >
                    {page}
                </li>
            ))
        }
        {
            currentPage < pages.length - 2
            && <li onClick={() => onPageChanged(pages.length)}
                className={cx('btn', styles.pages, {
                    selectedPage: currentPage === pages.length,
                })}
            >
                {pages.length}
            </li>
        }
    </ul>;
});

Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired,
    totalUsersCount: PropTypes.number.isRequired,
};

export default Pagination;
