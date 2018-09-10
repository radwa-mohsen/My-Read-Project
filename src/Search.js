import React ,{Component} from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


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
onShelfUpdate = (book,shelfName) => {
  this.props.onShelfUpdate(book,shelfName)
}

render(){
    const {query } = this.state
    const {AllShelfsBooks} = this.props
    let showingBooks
    if(query){
			const match = new RegExp(escapeRegExp(query),'i')
			showingBooks = AllShelfsBooks.filter((book) => match.test(book.title) || match.test(book.authors)) 
		}
		else{
			showingBooks = AllShelfsBooks
		}
		showingBooks.sort(sortBy('title'))
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
                               onChange = {(event) => this.updateQuery(event.target.value)}
                               />
                          </form>
                        </div>
                      </div>
                    <div className="search-books-results">
                    <ol className="books-grid">
                    {showingBooks.map((book) => (
                       <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" 
                            style={{
                            width: 128, 
                            height: 193 , 
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                         }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={e => this.onShelfUpdate(book, e.target.value)}>
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