import { h, VNode, Component } from 'hyperapp'
import { Helmet } from '../../src/index'
import { App } from './App'

export const BB3: Component = (_attributes: any, children: any): VNode => (
  <div>
    <Helmet key="helmet-bb3">
      <meta property="og:description" content="description-BB3" />
      <link rel="stylesheet" href="/bb3.css" />
      <style>{'body { line-height: 300%; }'}</style>
      <script src="/bb3.js" defer />
    </Helmet>
    <div>BB2</div>
    <div>{children}</div>
  </div>
)
