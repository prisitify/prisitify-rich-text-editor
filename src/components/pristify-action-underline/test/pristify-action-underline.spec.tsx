import { newSpecPage } from '@stencil/core/testing';
import { PristifyActionUnderline } from '../pristify-action-underline';

describe('pristify-action-underline', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PristifyActionUnderline],
      html: `<pristify-action-underline></pristify-action-underline>`,
    });
    expect(page.root).toEqualHtml(`
      <pristify-action-underline>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pristify-action-underline>
    `);
  });
});
