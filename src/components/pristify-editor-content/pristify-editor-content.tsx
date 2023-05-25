import { Component, Host, Listen, h } from '@stencil/core';
import userActionService from '../../service/UserActionService';

@Component({
  tag: 'pristify-editor-content',
  styleUrl: 'pristify-editor-content.css',
  shadow: false,
})
export class PristifyEditorContent {

  @Listen("mouseup")
  onMouseUp() {
    userActionService.mouseup();
  }

  render() {
    return (
      <Host>

         <div class="pristify-editor-content">
          <div  ref={(el) => userActionService.init(el as HTMLDivElement)} contenteditable={true}>
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <h4>Heading 4</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nihil est hic explicabo similique delectus velit, laboriosam repudiandae impedit? Ducimus, at quod iste accusantium repellat velit magni illo! Nemo, error!</p>
              <p><strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nihil est hic explicabo similique delectus velit, laboriosam repudiandae impedit? Ducimus, at quod iste accusantium repellat velit magni illo! Nemo, error!</strong></p>

              <ul>
                <li>PC</li>
                <li>Mobile</li>
              </ul>
              <img src="https://picsum.photos/id/3/1000/200" />
            </div>
         </div>

      </Host>
    );
  }

}
