import { Meteor } from 'meteor/meteor'
import expect from 'expect'

import { Notes } from './notes'

if (Meteor.isServer){
  describe('Notes', function(){

    const noteOne = {
      _id: 'testNoteId1',
      title: 'Title1',
      body:'My test1 body',
      updatedAt:0,
      userId: 'testUserId'
    }

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Thing to do',
      body:'Do it now',
      updatedAt:0,
      userId: 'testUserId2'
    }

    beforeEach( function() {
      Notes.remove({})

      Notes.insert(noteOne)
      Notes.insert(noteTwo)
    })

    it('should insert new note', function(){
      const userId = 'testid'
      const _id =  Meteor.server.method_handlers['notes.insert'].apply({ userId })

      expect(Notes.findOne({ _id, userId })).toExist()

    })

    it('should not insert note if not authenticated', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.insert'].apply()
      }).toThrow()
    })

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id])

      expect(Notes.findOne({_id: 'testNoteId1'})).toNotExist()
    })

    it('should not remove note if unauthentificated', function(){

      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({},[noteOne._id])
      }).toThrow()
    })

    it('should not remove a not if invalid id', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId})
      }).toThrow()
    })

    it('should update a note', function(){
      const data = {body:'new note body', title:'new title'}
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        data
      ])
      const newNote = Notes.findOne({_id:noteOne._id})

      expect(newNote.updatedAt).toBeGreaterThan(0)
      expect(newNote).toInclude({
        title: data.title,
        body: data.body
      })
    })

    it('should throw an error if extra fields are passed', function(){
      const data = {name: 'Rico', body: 'new body', title: 'new title'}

      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        },[
          noteOne._id,
          data
        ])
      }).toThrow()
    })

    it('should not update note if user is not the creator', function(){
      const data = {body:'new note body', title:'new title'}
      Meteor.server.method_handlers['notes.update'].apply({
        userId: '123nbv'
      }, [
        noteOne._id,
        data
      ])
      const newNote = Notes.findOne({_id:noteOne._id})

      expect(newNote).toInclude(noteOne)
    })

    it('should not update a note with invalid id', function() {
      const data = {body:'new note body', title:'new title'}
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({userId: 0},[noteOne._id])
      }).toThrow()
    })

    it('should failed to update a note if unauthentificated', function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({},[noteOne._id])
      }).toThrow()
    })

    it('should return a users notes', function() {
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch()
      expect(notes.length).toBe(1)
      expect(notes[0]).toEqual(noteOne)
    })

    it('should return 0 notes for user that has none', function(){
      const res = Meteor.server.publish_handlers.notes.apply({userId: '123'})
      const notes = res.fetch()
      expect(notes.length).toBe(0)
    })

  })
}
