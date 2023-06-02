import { Component, Listen, h } from '@stencil/core';
import userActionService from '../../service/UserActionService';

@Component({
  tag: 'pristify-editor',
  styleUrl: 'pristify-editor.css',
  shadow: false,
})
export class PristifyEditor {
  @Listen("mousemove")
  onMouseUp() {
    userActionService.mouseup();
  }
  render() {


    return (
      <div >
        <pristify-editor-header></pristify-editor-header>
        <pristify-editor-content ></pristify-editor-content>
      </div>
    );
  }

}
