import { Component, Listen, State, h } from '@stencil/core';
import userActionService from '../../service/UserActionService';
import Action from '../../service/Action';

@Component({
  tag: 'pristify-action-italic',
  styleUrl: 'pristify-action-italic.css',
  shadow: true,
})
export class PristifyActionItalic  implements Action {

  constructor() {
    userActionService.add(this);
  }
  getKey(): string {
    return "I";
  }

  active(): void {
    this.status = true;
  }
  inactive(): void {
    this.status = false;
  }

  @State() status: boolean;


  @Listen('actionClicked', { capture: true })
  handleClick() {
     if(this.status == false){
      userActionService.italic();
    }else {
      userActionService.removeItalic();
    }
  }



  render() {
    return (
      <pristify-editor-header-action active={this.status} >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"/></svg>
      </pristify-editor-header-action>
    )
  }

}
