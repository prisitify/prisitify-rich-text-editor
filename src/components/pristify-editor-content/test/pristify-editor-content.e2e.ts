import { newE2EPage } from '@stencil/core/testing';

describe('pristify-editor-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pristify-editor-content></pristify-editor-content>');

    const element = await page.find('pristify-editor-content');
    expect(element).toHaveClass('hydrated');
  });
});
