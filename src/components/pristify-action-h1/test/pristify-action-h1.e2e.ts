import { newE2EPage } from '@stencil/core/testing';

describe('pristify-action-h1', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pristify-action-h1></pristify-action-h1>');

    const element = await page.find('pristify-action-h1');
    expect(element).toHaveClass('hydrated');
  });
});
