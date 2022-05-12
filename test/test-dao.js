const {
  Dao,
  controller
} = require('../lib/dao')


const func = controller(async function (a, b) {
  a = new Dao(a)
  b = new Dao(b)

  await 1

  const c = (await a.value) + b.value
  console.log('c: ', c);
  const result = await new Dao(c)

  return result.value > 10 ? 'gt 10' : 'lt 10'
});

(async function run () {


  func(2, 3).then (function (result) {
    console.log('result: ', result);
  })
  func.controller.variables[0].lock()

  setTimeout(() => {
    func.controller.variables[0].value = 10
    func.controller.variables[0].release()
    func.controller.variables[0].unlock()
  }, 1000)

})()