import { h } from 'hyperapp'
import { Helmet } from '../../src'
import traverse = require('traverse')

/**
 * @jest-environment jsdom
 */
describe('<Helmet>', () => {
  let helmet
  beforeAll(() => {
    helmet = (
      <Helmet key="helmet">
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Test</title>
        <base href="http://localhost" />
        <link rel="stylesheet" href="/test.css" />
        <style>{'body { color: green; }'}</style>
        <script src="/test.js" defer />
      </Helmet>
    )
  })

  test('<template>', () => {
    expect(typeof helmet).toBe('object')
    expect(helmet.key).toBe('helmet')
    expect(helmet.nodeName).toBe('template')
    expect(helmet.attributes.key).toBe('helmet')
    expect(helmet.attributes.id).toBe('helmet')
    expect(helmet.attributes.class).toBe('hyperapp-helmet-parent')
    expect(helmet.attributes.style).toEqual({ display: 'none' })
  })

  describe('children', () => {
    let children
    beforeAll(() => {
      children = helmet.children
    })

    test('<title>', () => {
      const titleNodes = traverse(children).reduce((acc, node) => {
        if (node && node.nodeName === 'title') {
          return [...acc, node]
        }
        return acc
      }, [])
      expect(titleNodes[0]).toEqual({
        nodeName: 'title',
        attributes: {},
        children: ['Test'],
        key: null
      })
    })

    test('<meta>', () => {
      const metaNodes = traverse(children).reduce((acc, node) => {
        if (node && node.nodeName === 'meta') {
          return [...acc, node]
        }
        return acc
      }, [])
      expect(metaNodes[0]).toEqual({
        nodeName: 'meta',
        attributes: { charset: 'utf-8', class: 'hyperapp-helmet-child helmet' },
        children: [],
        key: undefined
      })
      expect(metaNodes[1]).toEqual({
        nodeName: 'meta',
        attributes: {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
          class: 'hyperapp-helmet-child helmet'
        },
        children: [],
        key: undefined
      })
      expect(metaNodes[2]).toEqual({
        nodeName: 'meta',
        attributes: {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
          class: 'hyperapp-helmet-child helmet'
        },
        children: [],
        key: undefined
      })
    })

    test('<base>', () => {
      const baseNodes = traverse(children).reduce((acc, node) => {
        if (node && node.nodeName === 'base') {
          return [...acc, node]
        }
        return acc
      }, [])
      expect(baseNodes[0]).toEqual({
        nodeName: 'base',
        attributes: {
          href: 'http://localhost',
          class: 'hyperapp-helmet-child helmet'
        },
        children: [],
        key: undefined
      })
    })

    test('<link>', () => {
      const linkNodes = traverse(children).reduce((acc, node) => {
        if (node && node.nodeName === 'link') {
          return [...acc, node]
        }
        return acc
      }, [])
      expect(linkNodes[0]).toEqual({
        nodeName: 'link',
        attributes: {
          rel: 'stylesheet',
          href: '/test.css',
          class: 'hyperapp-helmet-child helmet'
        },
        children: [],
        key: undefined
      })
    })

    test('<style>', () => {
      const styleNodes = traverse(children).reduce((acc, node) => {
        if (node && node.nodeName === 'style') {
          return [...acc, node]
        }
        return acc
      }, [])
      expect(styleNodes[0]).toEqual({
        nodeName: 'style',
        attributes: { class: 'hyperapp-helmet-child helmet' },
        children: ['body { color: green; }'],
        key: null
      })
    })

    test('<script>', () => {
      const styleNodes = traverse(children).reduce((acc, node) => {
        if (node && node.nodeName === 'script') {
          return [...acc, node]
        }
        return acc
      }, [])
      expect(styleNodes[0]).toEqual({
        nodeName: 'script',
        attributes: {
          src: '/test.js',
          defer: true,
          class: 'hyperapp-helmet-child helmet'
        },
        children: [],
        key: undefined
      })
    })
  })
})
