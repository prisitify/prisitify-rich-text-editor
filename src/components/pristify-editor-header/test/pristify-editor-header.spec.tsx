import { newSpecPage } from '@stencil/core/testing';
import { PristifyEditorHeader } from '../pristify-editor-header';

describe('pristify-editor-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PristifyEditorHeader],
      html: `<pristify-editor-header></pristify-editor-header>`,
    });
    expect(page.root).toEqualHtml(`
      <pristify-editor-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pristify-editor-header>
    `);
  });
});
