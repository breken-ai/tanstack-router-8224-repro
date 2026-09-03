import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage()

// 1. direct load of / (SSR)
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
const before = await page.evaluate(() => {
  const el = document.querySelector('[data-testid="dashboard"]')
  const links = [...document.head.querySelectorAll('link[rel=stylesheet]')].map((l) => l.href)
  const cs = getComputedStyle(el)
  return { padding: cs.padding, display: cs.display, bg: cs.backgroundColor, links }
})
console.log('BEFORE NAV (SSR /):', JSON.stringify(before, null, 1))
await page.screenshot({ path: '/tmp/8224-fixed-before.png', fullPage: true })

// 2. client-side navigate to /pool/123
await page.getByRole('link', { name: '/pool/123' }).click()
await page.waitForURL('**/pool/123')
await page.waitForTimeout(800)

const after = await page.evaluate(() => {
  const el = document.querySelector('[data-testid="dashboard"]')
  const links = [...document.head.querySelectorAll('link[rel=stylesheet]')].map((l) => l.href)
  const cs = getComputedStyle(el)
  return { padding: cs.padding, display: cs.display, bg: cs.backgroundColor, links }
})
console.log('AFTER NAV (/pool/123):', JSON.stringify(after, null, 1))
await page.screenshot({ path: '/tmp/8224-fixed-after.png', fullPage: true })
await browser.close()
