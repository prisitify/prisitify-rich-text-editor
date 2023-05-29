import { newSpecPage } from '@stencil/core/testing';
import { PristifyActionStrikethrough } from '../pristify-action-strikethrough';

describe('pristify-action-strikethrough', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PristifyActionStrikethrough],
      html: `<pristify-action-strikethrough></pristify-action-strikethrough>`,
    });
    expect(page.root).toEqualHtml(`
      <pristify-action-strikethrough>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </pristify-action-strikethrough>
    `);
  });
});
