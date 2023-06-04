import { Component, Host, Listen, h } from '@stencil/core';
import userActionService from '../../service/UserActionService';

@Component({
  tag: 'pristify-editor-content',
  styleUrl: 'pristify-editor-content.css',
  shadow: false,
})
export class PristifyEditorContent {


  render() {
    return (
      <Host>
          <div id="pristify-editor-console">

          </div>
         <div class="pristify-editor-content">
          <div  ref={(el) => userActionService.init(el as HTMLDivElement)} contenteditable={true}>
              <h1>Heading 1</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <strong><h4>Heading 4</h4></strong>


              <p>111111111 <i>222222222222 <s>UUUU<u>UU</u>UU <strong>333333333333 </strong>44444444</s>4444 <strong>5555555555 </strong>6666666666</i></p>
              <p>di sit. Officiis nemo deleniti dicta, pariatur labore voluptas obcaecati explicabo alias?m Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, ipsa. Dolorem rerum distinctio voluptatem mollitia molestias temporibus, inventore, numquam commodi exercitationem quos doloremque in. Iste recusandae at non nam saepe?</p>
              <p><strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nihil est hic explicabo similique delectus velit, laboriosam repudiandae impedit? Ducimus, at quod iste accusantium repellat velit magni illo! Nemo, error!</strong></p>
              <p><span><strong>Hello Strong</strong></span></p>
              <ul>
                <li>PC</li>
                <li>Mobile</li>
              </ul>

              <i><s><strong><u>TEST</u></strong></s></i>
              <img src="https://picsum.photos/id/3/1000/200" />
            </div>
         </div>

      </Host>
    );
  }

}
