import { Component,  EventEmitter,  Event,  Prop, h } from '@stencil/core';

@Component({
  tag: 'pristify-editor-header-action',
  styleUrl: 'pristify-editor-header-action.css',
  shadow: true,
})
export class PristifyEditorHeaderAction {

  @Event() actionClicked: EventEmitter<string>;

  @Prop() public icon: string;
  @Prop() public active: boolean = false;

  click = () => {
    this.actionClicked.emit();
  }
  render() {

    const classActive  = this.active ? "pristify-action active" : "pristify-action";
    return (
      <button class={classActive} onClick={this.click} >
        <slot></slot>
      </button>
    );
  }

}
