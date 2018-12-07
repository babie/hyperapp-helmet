import { VNode } from 'hyperapp'
import jsdom from 'jsdom'
import traverse from 'traverse'
import { getHelmetNodes } from '../src/index'
import { App } from './app/App'

declare var global: any
describe('hyperapp-helmet', () => {
  beforeAll(() => {
    global.document = new jsdom.JSDOM(
      '<!doctype html><html><body></body></html>',
      { url: 'http://localhost' }
    )
    global.window = document.defaultView
    global.navigator = { userAgent: 'node.js' }
  })

  describe('getHelmetNodes()', () => {
    let nodes: VNode[]
    beforeAll(() => {
      App.state.location.pathname = '/b'
      nodes = getHelmetNodes(App.view, App.state, App.actions)
    })

    test('title', () => {
      const titleNode = traverse(nodes).reduce((acc: any, n: VNode) => {
        if (n && n.nodeName === 'title') {
          return [...acc, n]
        }
        return acc
      }, [])[0]
      expect(titleNode.children[0]).toBe('title-B')
    })

    test('meta', () => {
      const metaNodes = traverse(nodes).reduce((acc: any, n: VNode) => {
        if (n && n.nodeName === 'meta') {
          return [...acc, n]
        }
        return acc
      }, [])
      expect(metaNodes[0].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-b',
        name: 'description',
        content: 'description-B'
      })
      expect(metaNodes[1].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-bb1',
        property: 'og:type',
        content: 'article'
      })
      expect(metaNodes[2].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-bb2',
        property: 'og:title',
        content: 'Title-BB2'
      })
      expect(metaNodes[3].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-bb3',
        property: 'og:description',
        content: 'description-BB3'
      })
    })

    test('link', () => {
      const linkNodes = traverse(nodes).reduce((acc: any, n: VNode) => {
        if (n && n.nodeName === 'link') {
          return [...acc, n]
        }
        return acc
      }, [])
      expect(linkNodes[0].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-b',
        rel: 'stylesheet',
        href: '/b.css'
      })
      expect(linkNodes[1].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-bb1',
        rel: 'stylesheet',
        href: '/bb1.css'
      })
      expect(linkNodes[2].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-bb2',
        rel: 'stylesheet',
        href: '/bb2.css'
      })
      expect(linkNodes[3].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-bb3',
        rel: 'stylesheet',
        href: '/bb3.css'
      })
    })

    test('script', () => {
      const scriptNodes = traverse(nodes).reduce((acc: any, n: VNode) => {
        if (n && n.nodeName === 'script') {
          return [...acc, n]
        }
        return acc
      }, [])
      expect(scriptNodes[0].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-b',
        defer: true,
        src: '/b.js'
      })
      expect(scriptNodes[1].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-bb1',
        defer: true,
        src: '/bb1.js'
      })
      expect(scriptNodes[2].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-bb2',
        defer: true,
        src: '/bb2.js'
      })
      expect(scriptNodes[3].attributes).toEqual({
        class: 'hyperapp-helmet-child helmet-bb3',
        defer: true,
        src: '/bb3.js'
      })
    })
  })
})
