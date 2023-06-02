import { Component, Listen, State, h} from '@stencil/core';
import userActionService  from '../../service/UserActionService';

@Component({
  tag: 'pristify-action-underline',
  styleUrl: 'pristify-action-underline.css',
  shadow: true,
})
export class PristifyActionUnderline {

  constructor() {
    userActionService.add(this);
  }

  active(): void {
    this.status = true;
  }
  inactive(): void {
    this.status = false;
  }

  @State() status: boolean;

  getKey() {
    return "U";
  }

  @Listen('actionClicked', { capture: true })
  handleClick() {
    if(this.status == false){
      userActionService.underline();
    }else {
      userActionService.removeUnderline();
    }
  }

  render() {
    return (
      <pristify-editor-header-action active={this.status}>
        U
      </pristify-editor-header-action>
    )
  }

}
