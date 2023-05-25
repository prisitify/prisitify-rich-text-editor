import { newE2EPage } from '@stencil/core/testing';

describe('pristify-action-h2', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pristify-action-h2></pristify-action-h2>');

    const element = await page.find('pristify-action-h2');
    expect(element).toHaveClass('hydrated');
  });
});
