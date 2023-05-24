import { newSpecPage } from '@stencil/core/testing';
import { PristifyActionBold } from '../pristify-action-bold';

describe('pristify-action-bold', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PristifyActionBold],
      html: `<pristify-action-bold></pristify-action-bold>`,
    });
    expect(page.root).toEqualHtml(`
      <pristify-action-bold>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pristify-action-bold>
    `);
  });
});
