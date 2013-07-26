tmin.js
===

Easy DOM content generator

inspired by [laconic.js](https://github.com/joestelmach/laconic) and client-side template engine by [ivan4th](https://github.com/ivan4th)

## Usage

Fast and clean elements creation

```javascript
el = t.div({
  class: ['class1', 'class2']
},
  t.a({
      style: {
        color: 'red'
      },
      href: 'example.com'
  }, 'link')
);

console.log(el.outerHTML);
```

output:

```html
<div class="class1 class2"><a href="example.com" style="color: red;">link</a></div>
```

Easy creation of collections for instant appending

```javascript
element = t(
    t.div({ class: 'class1' }),
    t.div({ class: 'class2' })
);
```

Short usage (if needed)

```javascript
t(t.div, t.span);
```

Data attribute

```javascript
el = t.div({
    class: 'user',
    data: {
        name: 'Andrey',
        homeAddress: 'Moscow'
    }
});

console.log(el.outerHTML);
```

output:

```html
<div class="user" data-name="Andrey" data-home-address="Moscow"></div>
```

jQuery version

```javascript
$el = $t.div({
  class: ['class1', 'class2']
},
  $t.a({
      style: {
        color: 'red'
      },
      href: 'example.com'
  }, 'link')
);
```

## License

(The MIT License)

Copyright (c) 2013 Andrey Yamanov <tenphi@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
