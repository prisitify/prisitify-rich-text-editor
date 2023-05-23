import { newE2EPage } from '@stencil/core/testing';

describe('pristify-editor-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pristify-editor-header></pristify-editor-header>');

    const element = await page.find('pristify-editor-header');
    expect(element).toHaveClass('hydrated');
  });
});
