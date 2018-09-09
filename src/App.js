import React from 'react'
import { Link } from 'react-router-dom'
import {Route} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import './App.css'
import Search from './Search.js'
import Shelfs from './Shelfs.js'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
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
  
  render() {
    return (
      <div className="app">
        
          <Route path="/search" render = {() => (
               <Search AllShelfsBooks = {this.state.AllShelfsBooks}
                  onShelfUpdate = {(book, shelfName) =>{
                  	this.onShelfUpdate(book, shelfName)
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
