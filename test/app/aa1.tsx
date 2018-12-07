import { h } from 'hyperapp'
import { Helmet } from '../../src/index'

export const AA1 = (
  <div>
    <Helmet key="helmet-aa1">
      <meta property="og:type" content="website" />
      <link rel="stylesheet" href="/aa1.css" />
      <style>{'body { width: 10%; }'}</style>
      <script src="/aa1.js" defer />
    </Helmet>
    <div>AA1</div>
  </div>
)
