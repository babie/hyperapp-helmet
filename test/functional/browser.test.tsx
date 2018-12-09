/**
 * @jest-environment puppeteer
 */
describe('Test Server', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/b')
  })

  describe('To `/a` page', () => {
    beforeAll(async () => {
      await expect(page).toClick('a', { text: 'LinkToA' })
      await page.waitForSelector('template#helmet-a', { timeout: 1000 })
    })

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

    it("should display A component's head tags on page", async () => {
      await expect(page).toMatchElement('head title', { text: 'title-A' })
      await expect(page).toMatchElement(
        'head meta.helmet-a[name=description][content=description-A]'
      )
      await expect(page).toMatchElement(
        'head link.helmet-a[rel=stylesheet][href="/a.css"]'
      )
      await expect(page).toMatchElement('head style.helmet-a', {
        text: 'body { background-color: red; }'
      })
      await expect(page).toMatchElement(
        'head script.helmet-a[src="/a.js"][defer]'
      )
    })

    it("should display AA1 component's head tags on page", async () => {
      await expect(page).toMatchElement(
        'head meta.helmet-aa1[property="og:type"][content=website]'
      )
      await expect(page).toMatchElement(
        'head link.helmet-aa1[rel=stylesheet][href="/aa1.css"]'
      )
      await expect(page).toMatchElement('head style.helmet-aa1', {
        text: 'body { width: 10%; }'
      })
      await expect(page).toMatchElement(
        'head script.helmet-aa1[src="/aa1.js"][defer]'
      )
    })

    it("should display AA2 component's head tags on page", async () => {
      await expect(page).toMatchElement(
        'head meta.helmet-aa2[property="og:title"][content=Title-AA2]'
      )
      await expect(page).toMatchElement(
        'head link.helmet-aa2[rel=stylesheet][href="/aa2.css"]'
      )
      await expect(page).toMatchElement('head style.helmet-aa2', {
        text: 'body { height: 20%; }'
      })
      await expect(page).toMatchElement(
        'head script.helmet-aa2[src="/aa2.js"][defer]'
      )
    })

    it("should display AA3 component's head tags on page", async () => {
      await expect(page).toMatchElement(
        'head meta.helmet-aa3[property="og:description"][content=description-AA3]'
      )
      await expect(page).toMatchElement(
        'head link.helmet-aa3[rel=stylesheet][href="/aa3.css"]'
      )
      await expect(page).toMatchElement('head style.helmet-aa3', {
        text: 'body { line-height: 30%; }'
      })
      await expect(page).toMatchElement(
        'head script.helmet-aa3[src="/aa3.js"][defer]'
      )
    })
  })
})
