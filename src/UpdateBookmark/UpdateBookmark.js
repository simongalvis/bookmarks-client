import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
import './UpdateBookmark.css'



class UpdateBookmark extends Component{

    static contextType = BookmarksContext;
    

    state = {
      title: '',
      url:'',
      description:'',
      rating:''

    }
    handleChangeTitle = (e) => {
        this.setState({
            title : e.target.value,
            
        });
     }
     handleChangeUrl = (e) => {
        this.setState({
            url : e.target.value,
            
        });
     }
     handleChangeDescription = (e) => {
        this.setState({
            description : e.target.value,
            
        });
     }
     handleChangeRating = (e) => {
        this.setState({
            rating : e.target.value,
            
        });
     }

 

    componentDidMount(){
        const bookmarkId = this.props.match.params.bookmarkId
        const findById = (id) => this.context.bookmarks.find(bookmark => bookmark.id == id)
        const bookmark = findById(bookmarkId)
        this.setState({
            title: bookmark.title || "Sample",
            url: bookmark.url || "Sample",
            description: bookmark.description || "Sample",
            rating: bookmark.rating|| "Sample"
        })

        
        
     
    }
    handleSubmit = e => {
        e.preventDefault()
        const { bookmarkId } = this.props.match.params
        const { id, title, url, description, rating } = this.state
        const newBookmark = { id, title, url, description, rating }
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
          method: 'PATCH',
          body: JSON.stringify(newBookmark),
          headers: {
            'content-type': 'application/json',
            //'authorization': `Bearer ${config.API_KEY}`
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
          })
          .then(() => {
           // this.resetFields(newBookmark)
            this.context.updateBookmark(newBookmark)
            this.props.history.push('/')
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
      }

  
   render() {
        



    if (!this.state.title){
        return null
    }
    
       return(
           
           <section className='EditArticleForm'>
               <h3>UpdateBookmark Component</h3>
        <h2>Edit article</h2>
        <form onSubmit={this.handleSubmit}>
       <label htmlFor="title">Title:</label><br/>
          <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChangeTitle}/><br/>
          <label htmlFor="description">Description:</label><br/>
          <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleChangeDescription}/><br/>
          <label htmlFor="url">URL:</label><br/>
          <input type="text" id="url" name="url" value={this.state.url} onChange={this.handleChangeUrl}/><br/>
          <label htmlFor="rating">Rating:</label><br/>
          <input type="number" id="rating" name="rating" value={this.state.rating} onChange={this.handleChangeRating}/><br/>
          <button type="submit" value="Update">Update</button>
        </form>
      </section>
       )
   }
   
}

export default UpdateBookmark;