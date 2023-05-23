import { newSpecPage } from '@stencil/core/testing';
import { PristifyEditorContent } from '../pristify-editor-content';

describe('pristify-editor-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PristifyEditorContent],
      html: `<pristify-editor-content></pristify-editor-content>`,
    });
    expect(page.root).toEqualHtml(`
      <pristify-editor-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pristify-editor-content>
    `);
  });
});
