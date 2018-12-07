import { h, View } from 'hyperapp'
import { Helmet } from '../../src/index'
import { App } from './App'

export const AA2: View<App.State, App.Actions> = (
  _state: App.State,
  _actions: App.Actions
) => (
  <div>
    <Helmet key="helmet-aa2">
      <meta property="og:title" content="Title-AA2" />
      <link rel="stylesheet" href="/aa2.css" />
      <style>{'body { height: 20%; }'}</style>
      <script src="/aa2.js" defer />
    </Helmet>
    <div>BB2</div>
  </div>
)
