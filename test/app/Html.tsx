import { h, View } from 'hyperapp'
import { App } from './App'
import { getHelmetNodes } from '../../src/index'

const Fragment = ''
export const Html: View<App.State, App.Actions> = (
  state: App.State,
  actions: App.Actions
) => {
  const helmetNodes = getHelmetNodes(App.view, state, actions)
  return (
    <Fragment>
      <Fragment innerHTML="<!doctype html>" />
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <base href="http://localhost:3000" />
          <link rel="stylesheet" href="/html.css" />
          <style>{'body { color: blue; }'}</style>
          <script src="./index.js" defer />
          {helmetNodes}
        </head>
        <body>
          <div id="app">{App.view}</div>
        </body>
      </html>
    </Fragment>
  )
}
