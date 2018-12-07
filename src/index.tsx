import { h, VNode, Component } from 'hyperapp'
import traverse = require('traverse')

const HELMET_PARENT_CLASS_NAME = 'hyperapp-helmet-parent'
const HELMET_CHILD_CLASS_NAME = 'hyperapp-helmet-child'

const NodeToDOM = ({ nodeName, attributes, children }: VNode) => {
  const element = document.createElement(nodeName)
  if (typeof attributes !== 'undefined') {
    const attrs: Map<string, string> = new Map(Object.entries(attributes))
    attrs.forEach((attrVal, attrKey) => {
      element.setAttribute(attrKey.toLowerCase(), attrVal)
    })
  }

  element.textContent = children
    .filter<string>((child): child is string => !!child)
    .reduce((acc, child) => {
      return acc + child
    }, '')

  children
    .filter<VNode>((child): child is VNode => !!child)
    .map(child => NodeToDOM(child))

  return element
}

const updateTitle = (helmet: Helmet) => {
  const title = helmet.titleNode.children
    .filter<string>((child): child is string => !!child)
    .reduce((acc, child) => {
      return acc + child
    }, '')
  if (title !== document.title) {
    document.title = title
  }
}

const appendOthers = (helmet: Helmet) => {
  const headElement = document.getElementsByTagName('head')[0]
  helmet.otherNodes
    .map((child: VNode) => NodeToDOM(child))
    .forEach((t: Element) => headElement.appendChild(t))
}

const appendHelmet = (helmet: Helmet) => {
  updateTitle(helmet)
  appendOthers(helmet)
}

const removeHelmet = (helmet: Helmet) => {
  const selector = `.${HELMET_CHILD_CLASS_NAME}.${helmet.key}`

  const headElement = document.getElementsByTagName('head')[0]
  const oldTags: Element[] = Array.prototype.slice.call(
    headElement.querySelectorAll(selector)
  )

  oldTags.forEach((t: Element) => {
    headElement.removeChild(t)
  })
}

const updateHelmet = (helmet: Helmet) => {
  removeHelmet(helmet)
  appendHelmet(helmet)
}

const setupNodes = (key: string, nodes: VNode[]): [VNode, VNode[]] => {
  const titleNode = nodes.filter(node => node.nodeName === 'title')[0]
  const tagNames = ['meta', 'base', 'link', 'style', 'script']
  const otherNodes = nodes
    .filter(node => tagNames.includes(node.nodeName))
    .map((child: VNode) => {
      return {
        ...child,
        attributes: {
          ...child.attributes,
          class: [HELMET_CHILD_CLASS_NAME, key].join(' ')
        }
      }
    })

  return [titleNode, otherNodes]
}

interface Helmet {
  key: string
  titleNode: VNode
  otherNodes: VNode[]
}

interface HelmetAttributes {
  key: string
}

export const Helmet: Component<HelmetAttributes, {}, {}> = (
  attributes: HelmetAttributes,
  children: any[]
) => {
  const key = attributes.key
  const [titleNode, otherNodes] = setupNodes(key, children)
  const helmet: Helmet = {
    key,
    titleNode,
    otherNodes
  }
  const oncreate = () => {
    updateHelmet(helmet)
  }
  const onupdate = () => {
    updateHelmet(helmet)
  }
  const onremove = (_e: Element, done: () => void) => {
    removeHelmet(helmet)
    done()
  }
  return (
    <template
      key={key}
      id={key}
      class={HELMET_PARENT_CLASS_NAME}
      style={{ display: 'none' }}
      oncreate={oncreate}
      onupdate={onupdate}
      onremove={onremove}
    >
      {titleNode}
      {otherNodes}
    </template>
  )
}

const resolveNode = (node: any, state: any, actions: any): VNode => {
  return typeof node !== 'function'
    ? node
    : resolveNode(node(state, actions), state, actions)
}

export const getHelmetNodes = (
  view: any,
  state: any,
  actions: any
): VNode[] => {
  const nodes = resolveNode(view, state, actions)
  return traverse(nodes).reduce((acc, node: VNode) => {
    if (node && node.nodeName === 'template') {
      const attributes = node.attributes as any
      if (attributes && attributes.class === HELMET_PARENT_CLASS_NAME) {
        return [...acc, ...node.children]
      }
    }
    return acc
  }, [])
}
