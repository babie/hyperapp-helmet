import { h, VNode } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Helmet } from '../../src/index'
import { App } from './App'
import { AA1 } from './aa1'
import { AA2 } from './aa2'
import { AA3 } from './aa3'

export const A = (): any => (
  state: App.State,
  _actions: App.Actions
): VNode => (
  <div key="a">
    <Helmet key="helmet-a">
      <title>title-A</title>
      <meta name="description" content="description-A" />
      <link rel="stylesheet" href="/a.css" />
      <style>{'body { background-color: red; }'}</style>
      <script src="/a.js" defer />
    </Helmet>
    <div>A</div>
    <div>{AA1}</div>
    <div>
      <AA2 location={state.location} />
    </div>
    <div>
      <AA3>child-AA3</AA3>
    </div>
    <Link to="/b">LinkToB</Link>
  </div>
)
