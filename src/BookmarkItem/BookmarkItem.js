import React from 'react';
import Rating from '../Rating/Rating';
import BookmarksContext from '../BookmarksContext';
import PropTypes from 'prop-types';
import config from '../config';
import { withRouter } from 'react-router-dom';
import './BookmarkItem.css';

const deleteBookmarkRequest = (bookmarkId, cb) => {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${config.API_KEY}`
    }
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      console.log({ data })
      cb(bookmarkId)
      this.props.history.push('/')
    })
    .catch(error => {
      console.log(error)
    })
}


 function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
    {(context) => (
      <li className='BookmarkItem'>
        <div className='BookmarkItem__row'>
          <h3 className='BookmarkItem__title'>
            <a
              href={props.url}
              target='_blank'
              rel='noopener noreferrer'>
              {props.title}
            </a>
          </h3>
          <Rating value={props.rating} />
        </div>
        <p className='BookmarkItem__description'>
          {props.description}
        </p>
        <div className='BookmarkItem__buttons'>
        <button
            className='BookmarkItem__description'
            onClick={() => props.history.push(`/update-bookmark/${props.id}`)}
          >
            Update Bookmark
          </button>
          <button
            className='BookmarkItem__description'
            onClick={() => {
              deleteBookmarkRequest(
                props.id,
                context.deleteBookmark,
              )
            }}
          >
            Delete
          </button>
        </div>
      </li>
    )}
  </BookmarksContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
  rating: 1,
  description: ""
}

BookmarkItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rating: PropTypes.number,
  description: PropTypes.string
};


export default withRouter(BookmarkItem);