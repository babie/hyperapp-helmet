/**
 * @jest-environment puppeteer
 */
describe('Test Server', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/b')
  })

  describe('On `/b` page', () => {
    it("should display Html component's head tags on page", async () => {
      await expect(page).toMatchElement('head meta[charset=utf-8]')
      await expect(page).toMatchElement(
        'head meta[name=viewport][content="width=device-width, initial-scale=1"]'
      )
      await expect(page).toMatchElement(
        'head base[href="http://localhost:3000"]'
      )
      await expect(page).toMatchElement(
        'head link[rel=stylesheet][href="/html.css"]'
      )
      await expect(page).toMatchElement('head style', {
        text: 'body { color: blue; }'
      })
      await expect(page).toMatchElement('head script[src="./index.js"][defer]')
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

    it("should display BB2 component's head tags on page", async () => {
      await expect(page).toMatchElement(
        'head meta.helmet-bb2[property="og:title"][content=Title-BB2]'
      )
      await expect(page).toMatchElement(
        'head link.helmet-bb2[rel=stylesheet][href="/bb2.css"]'
      )
      await expect(page).toMatchElement('head style.helmet-bb2', {
        text: 'body { height: 200%; }'
      })
      await expect(page).toMatchElement(
        'head script.helmet-bb2[src="/bb2.js"][defer]'
      )
    })

    it("should display BB3 component's head tags on page", async () => {
      await expect(page).toMatchElement(
        'head meta.helmet-bb3[property="og:description"][content=description-BB3]'
      )
      await expect(page).toMatchElement(
        'head link.helmet-bb3[rel=stylesheet][href="/bb3.css"]'
      )
      await expect(page).toMatchElement('head style.helmet-bb3', {
        text: 'body { line-height: 300%; }'
      })
      await expect(page).toMatchElement(
        'head script.helmet-bb3[src="/bb3.js"][defer]'
      )
    })
  })
})
