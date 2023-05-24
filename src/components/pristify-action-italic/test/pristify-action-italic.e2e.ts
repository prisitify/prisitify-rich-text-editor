import { newE2EPage } from '@stencil/core/testing';

describe('pristify-italic', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pristify-italic></pristify-italic>');

    const element = await page.find('pristify-italic');
    expect(element).toHaveClass('hydrated');
  });
});
