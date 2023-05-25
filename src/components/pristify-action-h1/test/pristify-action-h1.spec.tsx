import { newSpecPage } from '@stencil/core/testing';
import { PristifyActionH1 } from '../pristify-action-h1';

describe('pristify-action-h1', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PristifyActionH1],
      html: `<pristify-action-h1></pristify-action-h1>`,
    });
    expect(page.root).toEqualHtml(`
      <pristify-action-h1>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pristify-action-h1>
    `);
  });
});
