/* eslint-disable @stylistic/max-len */
import { expect, test } from '@playwright/test'

test('display day orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('20', { exact: true })).toBeVisible()
  expect(page.getByText('-5% em relação a ontem', { exact: true })).toBeVisible()
})

test('display month orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('200', { exact: true })).toBeVisible()
  expect(page.getByText('+10% em relação o mês passado', { exact: true })).toBeVisible()
})

test('display canceled orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByRole('heading', { name: 'Cancelamentos (mês)', exact: true })).toBeVisible()
  expect(page.getByText('5', { exact: true })).toBeVisible()
})

test('display month revenue orders amount metric', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  expect(page.getByText('200', { exact: true })).toBeVisible()
  expect(page.getByText('+7% em relação o mês passado', { exact: true })).toBeVisible()
})
