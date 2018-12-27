const Tom = require('test-object-model')

const tom = new Tom()
for (let i = 0; i < 1000; i++) {
  tom.test(`three-${i}`, () => {
    let string = ''
    for (let j = 0; j < 1e5; j++) {
      string += 'a'
    }
    return i
  })
}

module.exports = tom
