import { newSpecPage } from '@stencil/core/testing';
import { PristifyActionH2 } from '../pristify-action-h2';

describe('pristify-action-h2', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PristifyActionH2],
      html: `<pristify-action-h2></pristify-action-h2>`,
    });
    expect(page.root).toEqualHtml(`
      <pristify-action-h2>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pristify-action-h2>
    `);
  });
});
