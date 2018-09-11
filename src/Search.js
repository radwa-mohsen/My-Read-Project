import React ,{Component} from 'react'
import { Link } from 'react-router-dom'


class Search extends Component{
  state = {
		query :''
	}

	updateQuery = (query) => {
		this.setState({query})
	}

	clearQuery = () =>{
		this.setState({query:''})
	}
// onShelfUpdate = (book,shelfName) => {
//   this.clearQuery()
//   this.props.onShelfUpdate(book,shelfName)
// }

searchUpdate = (query) =>{
  this.props.searchUpdate(query)
}

render(){
    const coverImage = "../imgs/coverImage.png"
    const {query } = this.state
    const {SearchedBooks} = this.props
    
		
		return(
                  <div className="bookshelf-books">
                      <div className="search-books-bar">
                        <Link className="close-search" to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                          <form
                          onSubmit = {(e) => e.preventDefault()}
                          >
                            <input 
                               type="text" 
                               placeholder="Search by title or author"
                               value = {query}
                               onChange = {(event) => {this.updateQuery(event.target.value)
                                                      this.searchUpdate(event.target.value)}}
                               />
                          </form>
                        </div>
                      </div>
                    <div className="search-books-results">
                    <ol className="books-grid">
                    {/* loop inside the result of search */}
                    {SearchedBooks.map((book) => (
                       <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" 
                            style={{
                            width: 128, 
                            height: 193 , 
                            // handle the problem of no thumbnail
                            backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : coverImage})`
                         }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={e =>  this.props.onShelfUpdate(book, e.target.value)}>  
                                <option value="move" disabled>Move to...</option>
                                {/* mark on the chosen shelf and the default to non */}
                                <option value="currentlyReading"> Currently Reading</option>
                                <option value="wantToRead"> Want to Read</option>
                                <option value="read"> Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                            </div>
                          <div className="book-title">{book.title}</div>
                          {/* handle the problem of no authors */}
                          <div className="book-authors">${book.authors ? book.authors.join(', ') : "no available author" }</div>
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