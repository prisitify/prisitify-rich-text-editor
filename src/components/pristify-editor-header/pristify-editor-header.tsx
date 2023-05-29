import { Component,  h } from '@stencil/core';
// import userActionService from '../../service/UserActionService';

@Component({
  tag: 'pristify-editor-header',
  styleUrl: 'pristify-editor-header.css',
  shadow: true,
})
export class PristifyEditorHeader {

  render() {
    return (
      <div class="pristify-header">

        <pristify-action-italic></pristify-action-italic>
        <pristify-action-strikethrough></pristify-action-strikethrough>
        <pristify-action-bold></pristify-action-bold>
        <pristify-action-underline></pristify-action-underline>
        <pristify-action-h1></pristify-action-h1>
        <pristify-action-h2></pristify-action-h2>
      </div>
    );
  }

}
