import React from 'react'
import { Link } from 'react-router-dom'
import {Route} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import './App.css'
import Search from './Search.js'
import Shelfs from './Shelfs.js'

class BooksApp extends React.Component {
  
  render() {
    return (
      <div className="app">
        
          <Route path="/search" component = {Search}/>


        <Route path="/" exact component = {Shelfs}/>
         
      </div>
    )
  }
}

export default BooksApp
