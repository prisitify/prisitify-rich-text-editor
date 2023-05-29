import { newE2EPage } from '@stencil/core/testing';

describe('pristify-action-underline', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pristify-action-underline></pristify-action-underline>');

    const element = await page.find('pristify-action-underline');
    expect(element).toHaveClass('hydrated');
  });
});
