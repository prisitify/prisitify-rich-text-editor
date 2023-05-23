import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pristify-editor-header',
  styleUrl: 'pristify-editor-header.css',
  shadow: true,
})
export class PristifyEditorHeader {

  render() {
    return (
      <div class="pristify-header">
        <pristify-editor-header-action></pristify-editor-header-action>
        <pristify-editor-header-action></pristify-editor-header-action>
        <pristify-editor-header-action></pristify-editor-header-action>
      </div>
    );
  }

}
