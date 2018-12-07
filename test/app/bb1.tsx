import { h } from 'hyperapp'
import { Helmet } from '../../src/index'

export const BB1 = (
  <div>
    <Helmet key="helmet-bb1">
      <meta property="og:type" content="article" />
      <link rel="stylesheet" href="/bb1.css" />
      <style>{'body { width: 100%; }'}</style>
      <script src="/bb1.js" defer />
    </Helmet>
    <div>BB1</div>
  </div>
)
