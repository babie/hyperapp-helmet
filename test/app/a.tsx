import { h, VNode } from 'hyperapp'
import { Link } from '@hyperapp/router'
import { Helmet } from '../../src/index'
import { App } from './App'
import { AA1 } from './aa1'
import { AA2 } from './aa2'

export const A = (): any => (
  _state: App.State,
  _actions: App.Actions
): VNode => (
  <div key="a">
    <Helmet key="helmet-a">
      <title>A</title>
      <meta name="description" content="description-A" />
      <link rel="stylesheet" href="/a.css" />
      <style>{'body { background-color: red; }'}</style>
      <script src="/a.js" defer />
    </Helmet>
    <header>A</header>
    <div>{AA1}</div>
    <div>{AA2}</div>
    <Link to="/b">LinkToB</Link>
  </div>
)
