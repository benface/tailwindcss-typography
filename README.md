# Typography Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-typography
```

## Usage

```js
// tailwind.config.js
{
  theme: {
    textIndent: { // defaults to {}
      '1': '0.25rem',
      '2': '0.5rem',
    },
    textShadow: { // defaults to {}
      'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
      'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
    },
  },
  variants: { // all the following default to ['responsive']
    textIndent: ['responsive'],
    textShadow: ['responsive'],
    ellipsis: ['responsive'],
    hyphens: ['responsive'],
    textUnset: ['responsive'],
  },
  plugins: [
    require('tailwindcss-typography')({
      ellipsis: true, // defaults to true
      hyphens: true, // defaults to true
      textUnset: true, // defaults to true
    }),
  ],
}
```

This plugin generates the following utilities:

```css
/* configurable with the "textIndent" theme object */
.indent-[key] {
  text-indent: [value];
}

/* configurable with the "textShadow" theme object */
.text-shadow-[key] {
  text-shadow: [value];
}

/* disableable with the "ellipsis" option */
.ellipsis {
  text-overflow: ellipsis;
}

/* disableable with the "hyphens" option */
.hyphens-none {
  hyphens: none;
}
.hyphens-manual {
  hyphens: manual;
}
.hyphens-auto {
  hyphens: auto;
}

/* disableable with the "textUnset" option */
.font-family-unset {
  font-family: inherit;
}
.font-weight-unset {
  font-weight: inherit;
}
.font-style-unset {
  font-style: inherit;
}
.text-size-unset {
  font-size: inherit;
}
.text-align-unset {
  text-align: inherit;
}
.leading-unset {
  line-height: inherit;
}
.tracking-unset {
  letter-spacing: inherit;
}
.text-color-unset {
  color: inherit;
}
.text-transform-unset {
  text-transform: inherit;
}
```

Note: The `textShadow` theme object accepts a `default` key which generates a simple `text-shadow` class (instead of `text-shadow-default`).
