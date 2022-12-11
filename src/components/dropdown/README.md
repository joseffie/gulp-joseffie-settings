# Dropdown

> A mixin to easily create dropdown lists.

## Getting started

To use the mixin, import it into any of your Pug files, such as `index.pug`:

```pug
include ../components/dropdown/dropdown.pug
```

And call it with `+dropdown`.

Also don't forget to import `dropdown.js` in `src/base/scripts/index.js` and initialize the `Dropdown` class:

```js
import Dropdown from '@/components/dropdown/dropdown.js';

Dropdown('.dropdown');
```

## Base features

### `trigger-text`

To display text inside a dropdown button, use the `trigger-text` attribute:

```pug
+dropdown(trigger-text='Any trigger text')
```

### Dropdown content

Any elements written in the `+dropdown` block will be inside the dropdown menu.

```pug
+dropdown(trigger-text='Any trigger text')
  ul
    li We created list inside dropdown menu
    li And it was easily
```

### `baseClassName`

You can change the class name (by default is `dropdown`) of your dropdown using the `baseClassName` attribute:

```pug
+dropdown(baseClassName='article-dropdown')
```

Then the output will be something like this:

```html
<div class="article-dropdown">
  <div class="article-dropdown__trigger"></div>
  <div class="article-dropdown__menu"></div>
</div>
```

### `disabled`

You can make your dropdown list disabled by specifying `disabled='true'`:

```pug
+dropdown(disabled='true')
  p Any content
```

### `caret`

You can choose whether to display the caret inside the dropdown button by using the `caret` attribute and giving it a boolean value. By default is `true`.

```pug
+dropdown(caret='true')
//- or
+dropdown(caret='false')
```

## «Cosmetic» features

### `style`

You can create different style patterns for your dropdowns. To do this, specify the name of the pattern you want in the `style` attribute. Default value is `default`.

```pug
+dropdown(style='beautiful')
```

Then you can implement your pattern in SCSS by accessing the `&_style_<your-style>` selector. In our example, this is:

```scss
.dropdown {
  &_style_beautiful &__trigger {
  }
  &_style_beautiful &__text {
  }
  &_style_beautiful &__caret {
  }
  &_style_beautiful &__menu {
  }
}
```

### `color`

You can create style patterns based on the color of the dropdown. To do this, specify the color you want in the `color` attribute.

```pug
+dropdown(color='blue')
```

Then you can implement your color pattern in SCSS by accessing the `&_color_<your-color>` selector. In our example, this is:

```scss
.dropdown {
  &_color_blue &__trigger {
    background-color: #3547d4;
  }
}
```

### `size`

You can create style patterns based on the size of the dropdown. To do this, specify the size you want in the `size` attribute.

```pug
+dropdown(size='md')
```

Then you can implement your size pattern in SCSS by accessing the `&_size_<your-size>` selector. In our example, this is:

```scss
.dropdown {
  &_size_md &__menu {
    min-width: 75%;
  }
}
```

### `block`

By default, the dropdown is an inline-block element. If you want to make it block, set the `block` attribute to `true`. Default value is `false`.

```pug
+dropdown(block='true')
```
