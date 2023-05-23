import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pristify-editor',
  styleUrl: 'pristify-editor.css',
  shadow: false,
})
export class PristifyEditor {

  render() {

    
    return (
      <div>
        <pristify-editor-header></pristify-editor-header>
        <pristify-editor-content ></pristify-editor-content>
      </div>
    );
  }

}
