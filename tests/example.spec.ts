import { test, expect } from '@playwright/test';
import Login from '../src/pages/Login';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GSB Frais/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  // Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
});

test('Login with valid credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  
  await page.fill('input[name="login"]', 'Andre');

  await page.fill('input[name="password"]', 'secret');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  
});
