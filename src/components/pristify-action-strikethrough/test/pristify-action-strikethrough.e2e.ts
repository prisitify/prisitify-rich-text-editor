import { newE2EPage } from '@stencil/core/testing';

describe('pristify-action-strikethrough', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pristify-action-strikethrough></pristify-action-strikethrough>');

    const element = await page.find('pristify-action-strikethrough');
    expect(element).toHaveClass('hydrated');
  });
});
