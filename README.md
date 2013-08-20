jQuery Responsive Image Menu Plugin
====================================

This is a simple jQuery plugin I created for a game that needed a button panel that would dynamically resize elements to fit the panel depending on how many elements there were and how tall the container was.  

Notes
-----
* I tried my best to keep the plugin code as generic as possible, but I'm sure there's probably some edge case stuff I'm missing.
* Tested using jQuery 1.9.1
* For my requirement, my images were all the same size and square.  You may need to tinker with the innards if your images don't follow this standard.  I added an "aspect_ratio" option that you can use, although I have tested it myself yet.  
* Initially Chrome/Safari/iOS all had individual issues with loading images and setting widths and heights correctly.  The current state it's in worked in all browsers that I could get my hands on, but there may be some outliers.
* This was written assuming your native image size at 100% width of the container so that browsers can handle scaling down on their own

Getting Started
---------------
*  Load required JS files and make sure to have appropriate CSS rules.  Examples have been included.
*  An example structure that I used was:

```html
<div class="panel-container">
    <div id="panel" class="responsive-image-menu">
        <span>
            <a href="#">
                <img src="" />
            </a>
        </span>
        <span>
            <a href="#">
                <img src="" />
            </a>
        </span>
    </div>
</div>
```
*  The javscript is simply:

```javascript
$(function(){
  $("#panel").responsiveImageMenu({
    num_cols: 1,
    aspect_ratio: 1,
    list_tag: 'span'
  });
});
```

* The css is even simpler:

```css
.responsive-image-menu span {
  display: inline-block;
}
.responsive-image-menu span img {
  width: 100%;
}

```

See it in action
----------------

* Demo at http://jsfiddle.net
