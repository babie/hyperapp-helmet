/**
 * @jest-environment puppeteer
 */
const HELMET_PARENT_CLASS_NAME = 'hyperapp-helmet-parent'
const HELMET_CHILD_CLASS_NAME = 'hyperapp-helmet-child'

describe('Test Server', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/b')
  })

  it("should display Html component's head tags on page", async () => {
    await expect(page).toMatchElement('head meta[charset=utf-8]')
    await expect(page).toMatchElement(
      'head meta[name=viewport][content="width=device-width, initial-scale=1"]'
    )
    await expect(page).toMatchElement('head base[href="http://localhost:3000"]')
    await expect(page).toMatchElement(
      'head link[rel=stylesheet][href="/html.css"]'
    )
    await expect(page).toMatchElement('head style', {
      text: 'body { color: blue; }'
    })
    await expect(page).toMatchElement('head script[src="/html.js"][defer]')
  })

  it("should display B component's head tags on page", async () => {
    await expect(page).toMatchElement('head title', { text: 'title-B' })
    await expect(page).toMatchElement(
      'head meta.helmet-b[name=description][content=description-B]'
    )
    await expect(page).toMatchElement(
      'head link.helmet-b[rel=stylesheet][href="/b.css"]'
    )
    await expect(page).toMatchElement('head style.helmet-b', {
      text: 'body { background-color: blue; }'
    })
    await expect(page).toMatchElement(
      'head script.helmet-b[src="/b.js"][defer]'
    )
  })

  it("should display BB1 component's head tags on page", async () => {
    await expect(page).toMatchElement(
      'head meta.helmet-bb1[property="og:type"][content=article]'
    )
    await expect(page).toMatchElement(
      'head link.helmet-bb1[rel=stylesheet][href="/bb1.css"]'
    )
    await expect(page).toMatchElement('head style.helmet-bb1', {
      text: 'body { width: 100%; }'
    })
    await expect(page).toMatchElement(
      'head script.helmet-bb1[src="/bb1.js"][defer]'
    )
  })
})
