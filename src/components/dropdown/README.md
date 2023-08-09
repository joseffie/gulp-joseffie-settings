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

## Attributes

### `items`

To display a list inside a dropdown menu, use the `items` attribute. It takes an array of objects with data about a list item. Declare this array in `src/base/data/data/data.json` (you can also create a separate JSON file).

You can declare in the object of an item:

- `text` (type: String): Text of an item.
- `isActive` (type: Boolean): Indicate that this item is active (optional).
- `href` (type: String): <a> link. On `true` value, the item automatically becomes a link (optional).

```json
{
  "dropdownData": [
    {
      "text": "Item Text",
      "isActive": true,
      "href": "#"
    }
  ]
}
```

Afterwards, you can create a drop-down list like this:

```pug
+dropdown(items=dropdownData)
```

### `triggerText`

To display text inside a dropdown button, use the `triggerText` attribute:

```pug
+dropdown(triggerText='Any trigger text')
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

### `isDisabled`

You can make your dropdown list disabled by specifying `isDisabled='true'`:

```pug
+dropdown(isDisabled='true')
```

### `showCaret`

You can choose whether to display the caret inside the dropdown button by using the `showCaret` attribute. Default value is `true`.

```pug
+dropdown(showCaret='true')
//- or
+dropdown(showCaret='false')
```

### `mods`

Specify the modifiers of the component:

```pug
+dropdown(mods='mod1, mod2, mod3')
```

Converts to:

```html
<div class="dropdown dropdown_mod1 dropdown_mod2 dropdown_mod3">
  <button class="dropdown__trigger">...</button>
  <ul class="dropdown__menu">
    ...
  </ul>
</div>
```
