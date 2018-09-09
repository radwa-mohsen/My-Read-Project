import React ,{Component} from 'react'
import { Link } from 'react-router-dom'


class Search extends Component{
	render(){
		return(
			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <form>
                <input type="text" placeholder="Search by title or author"/>
                </form>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">

              {this.props.AllShelfsBooks.map((book) => (
                       <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" 
                            style={{
                            width: 128, 
                            height: 193 , 
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                         }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} >
                                <option value="move" disabled>Move to...</option>

                                <option value="currentlyReading">{(book.shelf ==="currentlyReading") && "✔"} Currently Reading</option>
                                <option value="wantToRead">{(book.shelf ==="wantToRead") && "✔"} Want to Read</option>
                                <option value="read">{(book.shelf ==="read") && "✔"} Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                            </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors.join(', ')}</div>
                        </div>
                      </li>
                      ))}
                
              </ol>
            </div>
          </div>
			)
		 
	}
}




export default Search