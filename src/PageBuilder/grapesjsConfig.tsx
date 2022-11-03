import 'grapesjs/dist/css/grapes.min.css'
// import grapesjs from 'grapesjs'
import gjsBlocksBasic from 'grapesjs-blocks-basic'
import gjsPresetWebpage from 'grapesjs-preset-webpage'

function myPlugin(editor: any){
    editor.BlockManager.add('my-first-block', {
      label: 'My block',
      content: `<div class='mydiv'>
      <h1>Welcome Back!</h1>
      <form action="/" method="post">
      
        <div class="field-wrap">
        <label>
          Email Address<span class="req">*</span>
        </label>
        <input type="email"required autocomplete="off"/>
      </div>
      
      <div class="field-wrap">
        <label>
          Password<span class="req">*</span>
        </label>
        <input type="password"required autocomplete="off"/>
      </div>
      
      <p class="forgot"><a href="#">Forgot Password?</a></p>
      
      <button class="button button-block"/>Log In</button>
      
      </form></div>`,
    });
}

// var editor = grapesjs.init({
//     container : '#gjs',
//     plugins: [myPlugin]
// });

function grapesjsConfig() {
    return {
        container: '#gjs',
        plugins: [gjsPresetWebpage, gjsBlocksBasic, myPlugin],
        width: '100%',
        height: 'calc(100vh - 75px)',
        pluginsOpts: {
            gjsPresetWebpage: {},
            gjsBlocksBasic: {},
            myPlugin: {

            }

        },
        panels: { defaults: [] },

        // blockManager: {
        //     appendTo: '#blocks',
        //     blocks: [
        //       {
        //         id: 'section', // id is mandatory
        //         label: '<b>Section</b>', // You can use HTML/SVG inside labels
        //         attributes: { class:'gjs-block-section' },
        //         content: `<section>
        //           <h1>This is a simple title</h1>
        //           <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        //         </section>`,
        //       }, {
        //         id: 'text',
        //         label: 'Text',
        //         content: '<div data-gjs-type="text">Insert your text here</div>',
        //       }, {
        //         id: 'image',
        //         label: 'Image',
        //         // Select the component once it's dropped
        //         select: true,
        //         // You can pass components as a JSON instead of a simple HTML string,
        //         // in this case we also use a defined component type `image`
        //         content: { type: 'image' },
        //         // This triggers `active` event on dropped components and the `image`
        //         // reacts by opening the AssetManager
        //         activate: true,
        //       }
        //     ]
        //   }
    }
}

    export default grapesjsConfig