# Typography Plugin for Tailwind CSS

## Installation

```bash
npm install tailwindcss-typography
```

## Usage

```js
// In your Tailwind CSS config
{
  theme: {
    textIndent: {
      '1': '0.25rem',
      '2': '0.5rem',
    },
    textShadow: {
      'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
      'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
    },
  },
  variants: {
    ellipsis: ['responsive'], // defaults to ['responsive']
    hyphens: ['responsive'], // defaults to ['responsive']
    textIndent: ['responsive'], // defaults to ['responsive']
    textShadow: ['responsive', 'hover'], // defaults to ['responsive']
  },
  plugins: [
    require('tailwindcss-typography')(),
  ],
}
```

This plugin generates the following utilities:

```css
.ellipsis {
  text-overflow: ellipsis;
}

.hyphens-none {
  hyphens: none;
}

.hyphens-manual {
  hyphens: manual;
}

.hyphens-auto {
  hyphens: auto;
}

/* configurable with the "textIndent" theme key */
.indent-[key] {
  text-indent: [value];
}

/* configurable with the "textShadow" theme key */
.text-shadow-[key] {
  text-shadow: [value];
}
```

Note: The `textShadow` theme key accepts a `default` key which generates a simple `.text-shadow` class (instead of `.text-shadow-default`).
