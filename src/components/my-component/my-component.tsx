import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;


  @Prop() age: number;

  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last) + "age  is : "  + this.age;
  }

  render() {
    return (
      <div>
        <h1>Patient documents</h1>
        <div>
          <ul>
            <li>Document 1</li>
            <li>Document 1</li>
            <li>Document 1</li>
            <li>Document 1</li>
            <li>Document 1</li>
            <li>Document 1</li>
          </ul>
        </div>
      </div>


      );
  }
}
