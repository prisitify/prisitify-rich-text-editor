import { newE2EPage } from '@stencil/core/testing';

describe('pristify-editor-header-action', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pristify-editor-header-action></pristify-editor-header-action>');

    const element = await page.find('pristify-editor-header-action');
    expect(element).toHaveClass('hydrated');
  });
});
