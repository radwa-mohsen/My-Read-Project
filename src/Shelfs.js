import React ,{Component} from 'react'
import { Link } from 'react-router-dom'



class Shelfs extends Component{

onShelfUpdate = (book,shelfName) => {
  this.props.onShelfUpdate(book,shelfName)
}
render(){
		const {AllShelfsBooks} = this.props
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