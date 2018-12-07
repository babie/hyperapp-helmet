import { h } from 'hyperapp'
import {
  Switch,
  Route,
  location,
  LocationState,
  LocationActions
} from '@hyperapp/router'
import { A } from './a'
import { B } from './b'

export namespace App {
  export const view = () => (
    <Switch>
      <Route path="/a" render={A} />
      <Route path="/b" render={B} />
    </Switch>
  )
  export interface State {
    location: LocationState
  }
  export interface Actions {
    location: LocationActions
  }
  export const state = { location: location.state }
  export const actions = { location: location.actions }
}
