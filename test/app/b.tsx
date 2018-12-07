import { h, VNode } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Helmet } from '../../src/index'
import { App } from './App'
import { BB1 } from './bb1'
import { BB2 } from './bb2'
import { BB3 } from './bb3'

export const B = (): any => (
  state: App.State,
  _actions: App.Actions
): VNode => (
  <div key="b">
    <Helmet key="helmet-b">
      <title>title-B</title>
      <meta name="description" content="description-B" />
      <link rel="stylesheet" href="/b.css" />
      <style>{'body { background-color: blue; }'}</style>
      <script src="/b.js" defer />
    </Helmet>
    <div>B</div>
    <div>{BB1}</div>
    <div>
      <BB2 location={state.location} />
    </div>
    <div>
      <BB3>child-BB3</BB3>
    </div>
    <Link to="/a">LinkToA</Link>
  </div>
)
