import { newSpecPage } from '@stencil/core/testing';
import { PristifyEditor } from '../pristify-editor';

describe('pristify-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PristifyEditor],
      html: `<pristify-editor></pristify-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <pristify-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pristify-editor>
    `);
  });
});
