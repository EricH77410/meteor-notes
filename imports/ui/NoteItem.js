import React from 'react';
import moment from 'moment'

const NoteItem = (props) => {
  return (
    <div>
      <h5>{props.note.title || 'Untitled note'}</h5>
      <p>{ moment(props.note.updatedAt).format('DD/M/YYYY') }</p>
    </div>
  )
}

NoteItem.propTypes = {
  note: React.PropTypes.object.isRequired
}

export default NoteItem
