import { newSpecPage } from '@stencil/core/testing';
import { PristifyEditorHeaderAction } from '../pristify-editor-header-action';

describe('pristify-editor-header-action', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PristifyEditorHeaderAction],
      html: `<pristify-editor-header-action></pristify-editor-header-action>`,
    });
    expect(page.root).toEqualHtml(`
      <pristify-editor-header-action>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pristify-editor-header-action>
    `);
  });
});
