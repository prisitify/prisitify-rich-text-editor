import { newSpecPage } from '@stencil/core/testing';
import { PristifyActionItalic } from '../pristify-action-italic';

describe('pristify-action-italic', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PristifyActionItalic],
      html: `<pristify-action-italic></pristify-action-italic>`,
    });
    expect(page.root).toEqualHtml(`
      <pristify-action-italic>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pristify-action-italic>
    `);
  });
});
