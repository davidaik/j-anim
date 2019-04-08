## jAnim.js

**jAnim.js** is a standalone JavaScript library that animates CSS properties.


## Work in progress

This library is a work in progress. It currently supports only a limited number of CSS properties and easing functions.


## Setting up

### Clone this repository

Clone this repository into your local machine.

    https://github.com/davidaik/j-anim.git


### Include the jAnim.js file
Upload the `jAnim.js` file to your website's `public` directory or anywhere you like and link to it in your HTML.

    <script src="/path/to/jAnim.js"></script>


## Usage

To animate an element's CSS property, you need to create an instance of jAnim.

    var anim = new jAnim('#element-id');
    // Or if you already have a reference to the element
    var el = document.getElementById('element-id');
    var anim = jAnim(el);

After you have a `jAnim` instance, you can configure the animation with the available functions, like so

    anim.opacity(0);
    anim.easing('linear');
    anim.start();

We can also use method chaining to do all this in a single line, like so

    new jAnim('#element-id').opacity(0).easing('linear').start();


## Methods

1. `duration(int)`  - arg is the animation duration in milliseconds.
2. `backgroundColor(color)` - arg is an rgba() string, e.g. 'rgba(0, 0, 0, 0.5)' - the target background color.
3. `opacity(float)` - arg is the target opacity.
4. `width(int)` - arg is the target width in pixels.
5. `height(int)` - arg is the target height in pixels.
6. `translationX(int)` - arg is the target value for the *left* CSS property.
7. `translationY(int)` - arg is the target value for the *top* CSS property.
8. `easing(easingFunction)` - arg is a string that matches any of the following:  
    `linear`, `inQuad`, `outQuad`.


## License
> MIT License

> Copyright (c) 2019 David Heisnam

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
