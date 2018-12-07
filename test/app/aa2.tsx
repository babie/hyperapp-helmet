import { h } from 'hyperapp'
import { Helmet } from '../../src/index'

export const AA2 = () => (
  <div>
    <Helmet key="aa2">
      <meta property="og:title" content="Title-AA2" />
      <link rel="stylesheet" href="/aa2.css" />
      <style>{'body { height: 20%; }'}</style>
      <script src="/aa2.js" defer />
    </Helmet>
    <div>AA2</div>
  </div>
)
