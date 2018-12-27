import { Meteor } from 'meteor/meteor'
import ReactDOM from 'react-dom'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'
import { browserHistory } from 'react-router'

import { routes, onAuthChange } from '../imports/routes/routes'

Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId()
  const currentPagePrivacy = Session.get('currentPagePrivacy')

  onAuthChange(isAuthenticated, currentPagePrivacy)
})

Tracker.autorun(()=>{
  const selectedNoteId = Session.get('selectedNoteId')
  Session.set('isNavOpen', false)
  
  if(selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)    
  }
})

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen')
  document.querySelector('body').classList.toggle('is-nav-open', isNavOpen)
})

Meteor.startup(()=>{
  Session.set('selectedNoteId', undefined)
  Session.set('isNavOpen', false)  
  Session.set('searchTerm',undefined)
  ReactDOM.render(routes, document.getElementById('app'))
})
