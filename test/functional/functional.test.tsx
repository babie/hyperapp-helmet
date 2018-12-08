/**
 * @jest-environment puppeteer
 */
describe('Test Server', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/b')
  })

  it('should display "template#helmet-b" element on page', async () => {
    await expect(page).toMatchElement('template#helmet-b')
  })
})
