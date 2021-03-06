# Hyperapp Helmet

Hyperapp Helmet is a library to update HTML &lt;head&gt; tags on [Hyperapp](https://github.com/jorgebucaran/hyperapp).

This library supports:

- Server-Side Rendering with [@hyperapp/router](https://github.com/hyperapp/router) and [@hyperapp/render](https://github.com/kriasoft/hyperapp-render)
- Nesting components
- TypeScirpt

## Versioning

- &gt;=1.0.0 &lt;2.0.0: for Hyperapp V1
- &gt;=2.0.0 &lt;3.0.0: for Hyperapp V2

## Installation

```shell-session
$ npm i hyperapp hyperapp-helmet
or
$ yarn add hyperapp hyperapp-helmet
```

## Usage

```jsx
import { h } from 'hyperapp'
import { Helmet } from 'hyperapp-helmet'

export const Some = () => (
  <div key="some">
    <Helmet key="some-helmet">
      <title>This is written in Helmet</title>
      <meta name="description" content="anything" />
      <link rel="stylesheet" href="/style.css" />
      <style>{'body { background-color: green; }'}</style>
      <script src="/some.js" defer />
    </Helmet>
    <h1>Anything Else</h1>
    <article>anything else.</article>
  </div>
)
```

- Helmet Component must have `key`!

### Server-Side Rendering

html.js:

```jsx
import { h, View } from 'hyperapp'
import { getHelmetNodes } from 'hyperapp-helmet'
import { App } from './App'

const Fragment = ''
export const Html = (state, actions) => {
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
```

server.js:

```js
import { JSDOM } from 'jsdom'

declare var global: any
global.document = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost:3000'
})
global.window = global.document.window
global.navigator = { userAgent: 'node.js' }

import { renderToStream } from '@hyperapp/render'
import express from 'express'

import { App } from './App'
import { Html } from './html'

const server = express()
server.use(express.static('./'))
server.get('/*', (req, res, next) => {
  App.state.location.pathname = req.path
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  renderToStream(Html, App.state, App.actions).pipe(res)
  next()
})

server.listen(3000, () => {
  console.log(`Server is running.`)
})
```

## API

### Helmet(attributes, children) => VNode

returns &lt;template&gt;{children}&lt;template&gt; nodes and it add/update/remove tags in &lt;head&gt;&lt;/head&gt; on `oncreate`/`onupdate`/`onremove` lifecycle.

- `attributes`: must have `key` prop.
- `children`: supports `title`, `base`, `meta`, `link`, `style`, `script` tags.

### getHelmetNodes(view, state, actions) => VNode[]

returns nodes for implementing in &lt;head&gt;&lt;/head&gt;.

- `view`: hyperapp view/nodes.
- `state`: hyperapp state.
- `actions`: hyperapp actions.

## Links

- SSR Sample with TypeScript at [hyperapp-typescript-sample](https://github.com/babie/hyperapp-typescript-sample).

## License

Hyperapp Helmet is MIT licensed. See [LICENSE](./LICENSE.md).
