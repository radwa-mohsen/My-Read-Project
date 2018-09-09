import React ,{Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class Search extends Component{

state = {
    AllShelfsBooks : []
  }

   componentDidMount() {
       BooksAPI.getAll()
      .then(books => {
        this.setState({ AllShelfsBooks: books })
    })
  }
  
   onShelfUpdate = (book, shelfName) => {
    debugger
  const {AllShelfsBooks} = this.state;
  // here we get the index of the book in the original array of book which equal the index of the edited book
  const updateIndex = AllShelfsBooks.findIndex(originalBook => originalBook.id === book.id)
  // now we get the book which we have to edit it's shelf property
    const updateBook = AllShelfsBooks[updateIndex]
    //now we edit the shelf property to the choosen by the user

    updateBook.shelf = shelfName
   // now we insert the book with new shelf into the main books array
   //to keep the same choice after refresh we have to update the database
   BooksAPI.update(updateBook,shelfName).then(() =>{

    this.setState({
      AllShelfsBooks: [...AllShelfsBooks.slice(0, updateIndex), updateBook, ...AllShelfsBooks.slice(updateIndex + 1)]
    })
   })
    

  }
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