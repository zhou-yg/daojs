const {
  Dao,
  controller
} = require('../../lib/dao')


const func = controller(async function (a, b) {
  a = await new Dao(a)
  b = await new Dao(b)

  const c = (await a.value) + b.value
  const result = await new Dao(c)

  return result.value > 10 ? 'gt 10' : 'lt 10'
});

async function func2 (a, b) {
  a = { value: await (a) }
  b = { value: await (b) }

  const c = (await a.value) - b.value
  const result = await { value: c }

  return result.value > 20 ? 'gt 10' : 'lt 10'
}
function func3 (a, b) {
  a = { value: a }
  b = { value: b }

  const c = (a.value) * b.value
  const result = { value: c }

  return result.value > 30 ? 'gt 10' : 'lt 10'
}

(async function run () {

  let max = 10000 * 1000 / 2
  let i = 0
  let st = Date.now()
  // while (i++ < max) {
  //   await func(2, 3)
  // }
  const cost1 = Date.now() - st

  const st2 = Date.now()
  // while (i++ < max) {
  //   await func2(10, 2)
  // }
  const cost2 = Date.now() - st2

  const st3 = Date.now()
  while (i++ < max) {
    await func3(5, 7)
  }
  const cost3 = Date.now() - st3

  console.log(`cost1=${cost1}, cost2=${cost2}, cost3=${cost3}`)

  // 9200ms, 2000ms, 386ms = 25倍的性能差距

})()