import { h, VNode, Component } from 'hyperapp'
import { Helmet } from '../../src/index'
import { App } from './App'

export const AA3: Component = (_attributes: any, children: any): VNode => (
  <div>
    <Helmet key="helmet-aa3">
      <meta property="og:description" content="description-AA3" />
      <link rel="stylesheet" href="/aa3.css" />
      <style>{'body { line-height: 30%; }'}</style>
      <script src="/aa3.js" defer />
    </Helmet>
    <div>AA2</div>
    <div>{children}</div>
  </div>
)
