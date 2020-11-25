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
 /*     url:  e.target == 'url'? e.target.value: this.state.url,
     description:  e.target == 'description'? e.target.value: this.state.description,
     rating:  e.target == 'rating'? e.target.value: this.state.rating */

    componentDidMount(){
        const bookmarkId = this.props.match.params.bookmarkId
        const findById = (id) => this.context.bookmarks.find(bookmark => bookmark.id == id)
        const bookmark = findById(bookmarkId)
        this.setState({
            title: bookmark.title,
            url: bookmark.url,
            description: bookmark.description,
            rating: bookmark.rating
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
        <form>
       <label for="title">Title:</label><br/>
          <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChangeTitle}/><br/>
          <label for="description">Description:</label><br/>
          <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleChangeDescription}/><br/>
          <label for="url">URL:</label><br/>
          <input type="text" id="url" name="url" value={this.state.url} onChange={this.handleChangeUrl}/><br/>
          <label for="rating">Rating:</label><br/>
          <input type="number" id="rating" name="rating" value={this.state.rating} onChange={this.handleChangeRating}/><br/>
          <button type="submit" value="Update">Update</button>
        </form>
      </section>
       )
   }
   
}

export default UpdateBookmark;