import { h, View } from 'hyperapp'
import { Helmet } from '../../src/index'
import { App } from './App'

export const BB2: View<App.State, App.Actions> = (
  _state: App.State,
  _actions: App.Actions
) => (
  <div>
    <Helmet key="helmet-bb2">
      <meta property="og:title" content="Title-BB2" />
      <link rel="stylesheet" href="/bb2.css" />
      <style>{'body { height: 200%; }'}</style>
      <script src="/bb2.js" defer />
    </Helmet>
    <div>BB2</div>
  </div>
)
