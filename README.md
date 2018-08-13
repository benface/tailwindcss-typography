# Typography Tailwind CSS Plugin

## Installation

```bash
npm install tailwindcss-typography
```

## Usage

```js
// In your Tailwind CSS config
{
  plugins: [
    require('tailwindcss-typography')({
      variants: ['responsive'],
      indents: {
        '1': '1px',
        '2': '2px',
      },
      textShadows: {
        'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
        'large': '0 2px 10px rgba(0, 0, 0, 0.5)',
      },
    }),
  ],
}
```

This plugin generates the following utilities:

```css
.ellipsis {
  text-overflow: ellipsis;
}

.hyphens {
  hyphens: auto;
}

/* configurable with the "indents" option */
.indent-[name] {
  text-indent: [value];
}

/* configurable with the "textShadows" option */
.text-shadow-[name] {
  text-shadow: [value];
}
```

Note: The `textShadows` option accepts a `default` key which generates a simple `.text-shadow` class (instead of `.text-shadow-default`).