import { newE2EPage } from '@stencil/core/testing';

describe('pristify-action-bold', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pristify-action-bold></pristify-action-bold>');

    const element = await page.find('pristify-action-bold');
    expect(element).toHaveClass('hydrated');
  });
});
