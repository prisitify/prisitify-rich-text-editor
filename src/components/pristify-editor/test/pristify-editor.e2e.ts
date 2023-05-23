import { newE2EPage } from '@stencil/core/testing';

describe('pristify-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pristify-editor></pristify-editor>');

    const element = await page.find('pristify-editor');
    expect(element).toHaveClass('hydrated');
  });
});
