import { Component, Listen, State, h} from '@stencil/core';
import userActionService  from '../../service/UserActionService';


@Component({
  tag: 'pristify-action-strikethrough',
  styleUrl: 'pristify-action-strikethrough.css',
  shadow: true,
})
export class PristifyActionStrikethrough {
 
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
    return "S";
  }

  @Listen('actionClicked', { capture: true })
  handleClick() {
    if(this.status == false){
      userActionService.strikethrough();
    }else {
      userActionService.removeStrikethrough();
    }
  }

  render() {
    return (
      <pristify-editor-header-action active={this.status}>
        S
      </pristify-editor-header-action>
    )
  }

}
