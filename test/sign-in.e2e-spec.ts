import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in')

  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail.',
  )

  await expect(toast).toBeVisible()

  await page.waitForTimeout(2)
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in')

  await page.getByLabel('Seu e-mail').fill('wrong@example.com')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText(
    'Credencias inválidas',
  )

  await expect(toast).toBeVisible()

  await page.waitForTimeout(2)
})

test('navigate to new restaurant', async ({ page }) => {
  await page.goto('/sign-in')

  // Click the get started link.
  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})
