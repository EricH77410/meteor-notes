import { Meteor } from 'meteor/meteor'
import ReactDOM from 'react-dom'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'
import { browserHistory } from 'react-router'

import { routes, onAuthChange } from '../imports/routes/routes'

Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

Tracker.autorun(()=>{
  const selectedNoteId = Session.get('selectedNoteId')

  if(selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)
  }
})

Meteor.startup(()=>{
  Session.set('selectedNoteId', undefined)
  ReactDOM.render(routes, document.getElementById('app'))
})