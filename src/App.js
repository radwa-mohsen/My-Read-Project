import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import Search from './Search.js'
import Shelfs from './Shelfs.js'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
	state = {
    AllShelfsBooks : [],
    SearchedBooks :[]
	}

	 componentDidMount() {
       BooksAPI.getAll()
      .then(books => {
        this.setState({ AllShelfsBooks: books })
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
   //to keep the same choice after refresh we have to update the database
   BooksAPI.update(updateBook,shelfName).then(() =>{

    this.setState({
      AllShelfsBooks: [...AllShelfsBooks.slice(0, updateIndex), updateBook, ...AllShelfsBooks.slice(updateIndex + 1)]
       
    })
   })
  }
  onShelfUpdateSearch = (book, shelfName) => {
    const {AllShelfsBooks} = this.state;
    const {SearchedBooks} = this.state;
    // here we get the index of the book in the original array of book which equal the index of the edited book
    const updateIndex = SearchedBooks.findIndex(originalBook => originalBook.id === book.id)
    // now we get the book which we have to edit it's shelf property
      const updateBook = SearchedBooks[updateIndex]
      //now we edit the shelf property to the choosen by the user
  
      updateBook.shelf = shelfName

     // now we insert the book with new shelf into the main books array
     //to keep the same choice after refresh we have to update the database
     BooksAPI.update(updateBook,shelfName).then(() =>{
      this.setState((state)=>({
        AllShelfsBooks : state.AllShelfsBooks.concat([updateBook]),
        SearchedBooks: [...SearchedBooks.slice(0, updateIndex), updateBook, ...SearchedBooks.slice(updateIndex + 1)]

      })
       
      )
     })
    }
  searchUpdate = (query) => {
    const {AllShelfsBooks} = this.state;
    if (query.length !== 0) {
      BooksAPI.search(query,30).then((books) => {
        if (books && books.length > 0) {
          books = books.filter((book) => (book.authors||book.title))
          // to assign the serached books to "none" shelf except the books which already assigned by users to other shelfs
          books.map((book)=>{
            const i = AllShelfsBooks.filter(org => org.id === book.id)
            
            if(i.length<1){
             return book.shelf = "none"            
            }
            else{
             return book.shelf = i[0].shelf
            }
          }         
         )
          this.setState(() => {
            return {SearchedBooks: books}
          })
        }
        else{
          this.setState({
            SearchedBooks :[]
          })
        }
      })
    }else{
      this.setState({
        SearchedBooks :[]
      })
    }
  }
  render() {
    return (
      <div className="app">
        
          <Route path="/search" render = {() => (
               <Search AllShelfsBooks = {this.state.AllShelfsBooks}
                       SearchedBooks = {this.state.SearchedBooks}
               searchUpdate = {(query) => {this.searchUpdate(query)}}
                  onShelfUpdate = {(book, shelfName) =>{
                    this.onShelfUpdateSearch(book, shelfName)
                   
                  }}/>
          	)}/>


        <Route path="/" exact render = {() => (
          <Shelfs AllShelfsBooks = {this.state.AllShelfsBooks}
                  onShelfUpdate = {(book, shelfName) =>{
                  	this.onShelfUpdate(book, shelfName)
                  }}/>

        	)
    }/>
         
      </div>
    )
  }
}

export default BooksApp
