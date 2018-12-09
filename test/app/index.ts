import { app } from 'hyperapp'
import { location } from '@hyperapp/router'

import { App as A } from './App'

const container = document.getElementById('app')
let main
if (process.env.NODE_ENV === 'development') {
  main = require('@hyperapp/logger').withLogger(app)(
    A.state,
    A.actions,
    A.view,
    container
  )
} else {
  main = app(A.state, A.actions, A.view, container)
}
const unsubscribe = location.subscribe(main.location)
