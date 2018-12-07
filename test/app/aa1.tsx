import { h } from 'hyperapp'
import { Helmet } from '../../src/index'

export const AA1 = () => (
  <div>
    <Helmet key="aa1">
      <meta property="og:title" content="Title-AA1" />
      <link rel="stylesheet" href="/aa1.css" />
      <style>{'body { width: 10%; }'}</style>
      <script src="/aa1.js" defer />
    </Helmet>
    <div>AA1</div>
  </div>
)
