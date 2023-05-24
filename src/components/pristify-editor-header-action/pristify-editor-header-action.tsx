import { Component,  EventEmitter,  Event,  Prop, h } from '@stencil/core';

@Component({
  tag: 'pristify-editor-header-action',
  styleUrl: 'pristify-editor-header-action.css',
  shadow: true,
})
export class PristifyEditorHeaderAction {

  @Event() actionClicked: EventEmitter<string>;

  @Prop() public icon: string;

  click = () => {
    this.actionClicked.emit();
  }
  render() {
    return (
      <button class="pristify-action" onClick={this.click}>
        {this.icon}
      </button>
    );
  }

}
