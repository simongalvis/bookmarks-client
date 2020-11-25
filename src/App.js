import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import UpdateBookmark from './UpdateBookmark/UpdateBookmark.js';
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarksContext from './BookmarksContext';
import Nav from './Nav/Nav';
import config from './config';
import PropTypes from 'prop-types'
import './App.css';
import Rating from './Rating/Rating';

class App extends Component {
  state = {
    bookmarks: [{id:7, title:'Sample', url: 'https://courses.thinkful.com/node-postgres-v1/checkpoint/17', description: 'Jesus is Lord', rating: 5}],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = bookmarkId => {
    console.log(bookmarkId)
    // todo: remove bookmark with bookmarkId from state
    const newBookmarks = this.state.bookmarks.filter(bm =>
      bm.id !== bookmarkId
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  updateBookmark = () => {};

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark
    }
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
          <Rating value={1}/>
          <Route
              exact
              path='/'
              component={BookmarkList}
            />
            <Route exact
              path='/add-bookmark'
              component={AddBookmark}
            />
            <Route exact
            path='/update-bookmark/:bookmarkId'
            component={UpdateBookmark}
            />
            
            {/* <!--<BookmarkList bookmarks={[{title: 'hello', url: 'hi'}]}/> --> */}
            
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;