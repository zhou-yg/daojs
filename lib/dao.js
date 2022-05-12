let globalCurrentController

const controllerStack = []

function pushStack (controller) {
  globalCurrentController = controller
  controllerStack.push(controller)
}
function popStack () {
  controllerStack.pop()
  globalCurrentController = controllerStack[controllerStack.length - 1]
}

class Controller {
  variables = []
  add (dao) {
    this.variables.push(dao)
  }
  remove (dao) {
    this.variables = this.variables.filter(d => d !== dao)
  }
}

function controllerExecute (fn) {
  const currentController = new Controller()

  const callback = async (...args) => {

    pushStack(currentController)
  
    const result = await fn(...args)
  
    popStack()
    return result
  }

  callback.controller = currentController

  return callback
}


class Dao {
  innerValue = undefined

  constructor(value) {
    this.innerValue = value

    globalCurrentController.add(this)
  }
  lock () {
    this.lockFlag = true
  }
  unlock () {
    this.lockFlag = false
    this.getPromiseResolve?.()
  }
  release () {
    this.releaseFlag = true
  }
  set value (v) {
    this.innerValue = v
  }
  get value () {
    if (this.lockFlag) {
      console.log('this.lockFlag: ', this.lockFlag);
      this.getPromise = new Promise((resolve, reject) => {
        this.getPromiseResolve = () => resolve(this.innerValue)
      })
      return this.getPromise
    }
    if (this.releaseFlag) {
      throw new Error('this.release')
    }
    return this.innerValue
  }
}

module.exports.Dao = Dao
module.exports.controller = controllerExecute
