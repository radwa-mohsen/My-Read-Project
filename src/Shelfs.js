import React ,{Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class Shelfs extends Component{
	state = {
		AllShelfsBooks : []
	}

	 componentDidMount() {
       BooksAPI.getAll()
      .then(books => {
        this.setState({ AllShelfsBooks: books })
        console.log(this.state.AllShelfsBooks)
	  })
  }
  
   onShelfUpdate = (book, shelfName) => {
	const {AllShelfsBooks} = this.state;
	// here we get the index of the book in the original array of book which equal the index of the edited book
	const updateIndex = AllShelfsBooks.findIndex(originalBook => originalBook.id === book.id)
	// now we get the book which we have to edit it's shelf property
    const updateBook = AllShelfsBooks[updateIndex]
    //now we edit the shelf property to the choosen by the user

    updateBook.shelf = shelfName
   // now we insert the book with new shelf into the main books array
   BooksAPI.update(updateBook,shelfName).then(() =>{
    this.setState({
      AllShelfsBooks: [...AllShelfsBooks.slice(0, updateIndex), updateBook, ...AllShelfsBooks.slice(updateIndex + 1)]

    })
   })
    

	}

render(){
		const {AllShelfsBooks} = this.state
		const shelfsCategory = [
        {
        	name : "Read",
        	books : AllShelfsBooks.filter((book) => book.shelf === "read" )
        },{
        	name : "Current Reading",
        	books : AllShelfsBooks.filter((book) => book.shelf === "currentlyReading")
        },{
        	name : "Want To Read",
        	books : AllShelfsBooks.filter((book) => book.shelf === "wantToRead")
        }]
        console.log(shelfsCategory[1],'current')
    
		return(
			 <div className="list-books">
            <div className="list-books-title">

              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfsCategory.map((shelf) => (
                    <div className="bookshelf">

                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {shelf.books.map((book) => (
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
                	))}        
              </div>
            </div>
            <div className="open-search">
               <Link to = "/search"> Add a book </Link>
            </div>
          </div>
			)
	}
	
}

export default Shelfs