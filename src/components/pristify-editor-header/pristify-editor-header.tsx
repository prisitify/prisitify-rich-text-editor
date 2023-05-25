import { Component,  h } from '@stencil/core';

@Component({
  tag: 'pristify-editor-header',
  styleUrl: 'pristify-editor-header.css',
  shadow: true,
})
export class PristifyEditorHeader {

  render() {
    return (
      <div class="pristify-header">

        <pristify-action-bold></pristify-action-bold>
        <pristify-action-italic></pristify-action-italic>
        <pristify-action-h1></pristify-action-h1>
        <pristify-action-h2></pristify-action-h2>
      </div>
    );
  }

}
