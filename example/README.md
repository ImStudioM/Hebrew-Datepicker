

# he-datepicker
hebrew date picker based on [Hebcal.com](https://www.hebcal.com/home/developer-apis) api

Demo
---
[he-datepicker demo](#). [Codepen demo](#)


 
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


Then initialize the `JewishDatepicker` object
``` html
<body>
    <script>
    window.addEventListener('load', function () {
			const datepicker = new JewishDatepicker( '#Birthday',{
					color: '#9C27B0',
          hideHeader: false,
				}
			);
		});
		
    </script>
</body>  
```


#### All available options (for now)

| Option     | Type    | Default | Description |
| ------     | ----    | ------- | ----------- |
| color      | String  | `#673ab7` | Hex color |
| hideHeader | boolean  | false | Hide the header of the datepicker |





License
---


