

# he-datepicker
lightweight JavaScript library that allows you to add a Hebrew datepicker to your HTML forms.
Dates by [Hebcal.com](https://www.hebcal.com/home/developer-apis) api

Demo
---
[Demo](https://imstudiom.github.io/Hebrew-Datepicker/example/) | [Codepen demo](https://codepen.io/shahar2200/pen/qBGbYPg)


 
Browser support
---
All modern browsers.


Installation
---
#### Download from Github

You can also directly download lightgallery from github.


#### Include CSS and Javascript files
First of all add he-datepicker.css & he-datepicker.js in the &lt;head&gt; of the document.
``` html
<head>
    <link href="../dist/css/he-datepicker.css" rel="stylesheet">
    <script src="../dist/js/he-datepicker.js" defer></script>
</head>


```
An example of HTML
``` html

  <form action="datepicker_from" onsubmit="event.preventDefault();">

    <label for="name">שם פרטי:</label><br>
    <input type="text" id="fname" name="name" value=""><br><br>

    <label for="lastname">שם משפחה:</label><br>
    <input type="text" id="lastname" name="lastname" value=""><br><br>

    <label for="Birthday">תאריך לידה:</label><br>
    <input type="text" id="Birthday" name="Birthday" value=""><br><br>

    <input type="submit">

  </form>

```



Then initialize the `JewishDatepicker` object
``` html

<script>
  window.addEventListener('load', function () {
    const datepicker = new JewishDatepicker( '#Birthday',{
        color: '#9C27B0',
        hideHeader: false,
      }
    );
  });
  
  </script>
 
```


#### All available options (for now)

| Option     | Type    | Default | Description |
| ------     | ----    | ------- | ----------- |
| color      | `String`  | `#673ab7` | Hex color |
| hideHeader | `boolean`  | false | Hide the header of the datepicker |





License
---
##### MIT license
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

