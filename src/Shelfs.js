import React ,{Component} from 'react'
import { Link } from 'react-router-dom'



class Shelfs extends Component{

onShelfUpdate = (book,shelfName) => {
  this.props.onShelfUpdate(book,shelfName)
}
render(){
  //to handle the problem of books have no thimbnail
  const coverImage = "../imgs/coverImage.png"
    const {AllShelfsBooks} = this.props
    // the three shelfs can the user choose between them
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
                {/* loop inside shelfs except none */}
                {shelfsCategory.map((shelf) => (
                    <div key={shelf.name} className="bookshelf">

                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {/* loop inside the book in specific shelf */}
                    {shelf.books.map((book) => (
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
                              <select value={book.shelf} onChange={e => this.onShelfUpdate(book, e.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                 {/* mark on the chosen shelf and the default to non */}
                                <option value="currentlyReading">{(book.shelf ==="currentlyReading") && "✔"} Currently Reading</option>
                                <option value="wantToRead">{(book.shelf ==="wantToRead") && "✔"} Want to Read</option>
                                <option value="read">{(book.shelf ==="read") && "✔"} Read</option>
                                <option value="none">{(book.shelf ==="none") && "✔"}None</option>
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