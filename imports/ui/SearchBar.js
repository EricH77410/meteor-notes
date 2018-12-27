import React from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'

export class SearchBar extends React.Component {
    state = {
        term: ''
    }
    onInputChange = (e) => {
        this.setState({term: e.target.value}, () => {
            Session.set('searchTerm', this.state.term)
        })        
    }
    render(){
        return (
            <div className="search-bar">
                <input 
                type="text"
                value={this.state.term}
                onChange={this.onInputChange}
                placeholder="Search notes"
                />
            </div>
        )
    }
}

export default createContainer(()=>{
    return {  }
  }, SearchBar)
