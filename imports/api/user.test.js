import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { validateNewUser } from './users'

if (Meteor.isServer){
  describe('Users', function() {

    it('should allow valide email address', function(){
      const testUser = {
        emails: [
          {
            address: 'rico@club.fr'
          }
        ]
      }

      const res = validateNewUser(testUser)

      expect(res).toBe(true)

    })
    it('should reject invalid email', function(){
      const testUser = {
        emails: [
          {
            address: 'rico%flkdlfk'
          }
        ]
      }
      expect(()=>{
        validateNewUser(testUser)
      }).toThrow()
    })

  })
}




//
// const add = (a, b) => {
//   if (typeof b !== 'number') {
//     return a + a
//   }
//   return a + b
// }
//
// const square = (a) => {
//   return a * a
// }
//
// const capitalise = (blase) => {
//   return blase.toUpperCase()
// }
//
// describe('Add', function(){
//   it('should add 2 numbers', function(){
//     const res = add(5,11)
//
//     expect(res).toBe(16)
//
//   })
//   it('should double a single number', function(){
//     const res = add(44)
//
//     expect(res).toBe(88)
//   })
// })
//
//
// describe('Square', function(){
//   it('should square a number', function(){
//     const res = square(11)
//
//     expect(res).toBe(121)
//   })
//
//   it('should square a number', function(){
//     const res = square(5)
//
//     expect(res).toBe(25)
//   })
// })
//
// describe('Uppercase', function() {
//   it('should return name to Uppercase', function(){
//     const res = capitalise('eric')
//
//     expect(res).toBe('ERIC')
//   })
// })
