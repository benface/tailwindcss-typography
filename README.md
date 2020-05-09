# Typography Plugin for Tailwind CSS

## Requirements

This plugin requires Tailwind CSS 1.2 or later. If your project uses an older version of Tailwind, you should install the latest 2.x version of this plugin (`npm install tailwindcss-typography@2.x`).

## Installation

```bash
npm install tailwindcss-typography
```

## Usage

```js
// tailwind.config.js
module.exports = {
  theme: {
    textIndent: { // defaults to {}
      '1': '0.25rem',
      '2': '0.5rem',
    },
    textShadow: { // defaults to {}
      'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
      'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
    },
    textDecorationStyle: { // defaults to these values
      'solid': 'solid',
      'double': 'double',
      'dotted': 'dotted',
      'dashed': 'dashed',
      'wavy': 'wavy',
    },
    textDecorationColor: { // defaults to theme => theme('colors')
      'red': '#f00',
      'green': '#0f0',
      'blue': '#00f',
    },
    fontVariantCaps: { // defaults to these values
      'normal': 'normal',
      'small': 'small-caps',
      'all-small': 'all-small-caps',
      'petite': 'petite-caps',
      'unicase': 'unicase',
      'titling': 'titling-caps',
    },
    fontVariantNumeric: { // defaults to these values
      'normal': 'normal',
      'ordinal': 'ordinal',
      'slashed-zero': 'slashed-zero',
      'lining': 'lining-nums',
      'oldstyle': 'oldstyle-nums',
      'proportional': 'proportional-nums',
      'tabular': 'tabular-nums',
      'diagonal-fractions': 'diagonal-fractions',
      'stacked-fractions': 'stacked-fractions',
    },
    fontVariantLigatures: { // defaults to these values
      'normal': 'normal',
      'none': 'none',
      'common': 'common-ligatures',
      'no-common': 'no-common-ligatures',
      'discretionary': 'discretionary-ligatures',
      'no-discretionary': 'no-discretionary-ligatures',
      'historical': 'historical-ligatures',
      'no-historical': 'no-historical-ligatures',
      'contextual': 'contextual',
      'no-contextual': 'no-contextual',
    },
    textRendering: { // defaults to these values
      'rendering-auto': 'auto',
      'optimize-legibility': 'optimizeLegibility',
      'optimize-speed': 'optimizeSpeed',
      'geometric-precision': 'geometricPrecision'
    },
    textStyles: theme => ({ // defaults to {}
      heading: {
        output: false, // this means there won't be a "heading" component in the CSS, but it can be extended
        fontWeight: theme('fontWeight.bold'),
        lineHeight: theme('lineHeight.tight'),
      },
      h1: {
        extends: 'heading', // this means all the styles in "heading" will be copied here; "extends" can also be an array to extend multiple text styles
        fontSize: theme('fontSize.5xl'),
        '@screen sm': {
          fontSize: theme('fontSize.6xl'),
        },
      },
      h2: {
        extends: 'heading',
        fontSize: theme('fontSize.4xl'),
        '@screen sm': {
          fontSize: theme('fontSize.5xl'),
        },
      },
      h3: {
        extends: 'heading',
        fontSize: theme('fontSize.4xl'),
      },
      h4: {
        extends: 'heading',
        fontSize: theme('fontSize.3xl'),
      },
      h5: {
        extends: 'heading',
        fontSize: theme('fontSize.2xl'),
      },
      h6: {
        extends: 'heading',
        fontSize: theme('fontSize.xl'),
      },
      link: {
        fontWeight: theme('fontWeight.bold'),
        color: theme('colors.blue.400'),
        '&:hover': {
          color: theme('colors.blue.600'),
          textDecoration: 'underline',
        },
      },
      richText: {
        fontWeight: theme('fontWeight.normal'),
        fontSize: theme('fontSize.base'),
        lineHeight: theme('lineHeight.relaxed'),
        '> * + *': {
          marginTop: '1em',
        },
        'h1': {
          extends: 'h1',
        },
        'h2': {
          extends: 'h2',
        },
        'h3': {
          extends: 'h3',
        },
        'h4': {
          extends: 'h4',
        },
        'h5': {
          extends: 'h5',
        },
        'h6': {
          extends: 'h6',
        },
        'ul': {
          listStyleType: 'disc',
        },
        'ol': {
          listStyleType: 'decimal',
        },
        'a': {
          extends: 'link',
        },
        'b, strong': {
          fontWeight: theme('fontWeight.bold'),
        },
        'i, em': {
          fontStyle: 'italic',
        },
      },
    }),
  },
  variants: { // all the following default to ['responsive']
    textIndent: ['responsive'],
    textShadow: ['responsive'],
    textDecorationStyle: ['responsive'],
    textDecorationColor: ['responsive'],
    ellipsis: ['responsive'],
    hyphens: ['responsive'],
    kerning: ['responsive'],
    textUnset: ['responsive'],
    fontVariantCaps: ['responsive'],
    fontVariantNumeric: ['responsive'],
    fontVariantLigatures: ['responsive'],
    textRendering: ['responsive'],
  },
  plugins: [
    require('tailwindcss-typography')({
      // all these options default to the values specified here
      ellipsis: true,         // whether to generate ellipsis utilities
      hyphens: true,          // whether to generate hyphenation utilities
      kerning: true,          // whether to generate kerning utilities
      textUnset: true,        // whether to generate utilities to unset text properties
      componentPrefix: 'c-',  // the prefix to use for text style classes
    }),
  ],
};
```

This plugin generates the following utilities:

```css
/* configurable with the "textIndent" theme object */
.indent-[key] {
  text-indent: [value];
}

/* configurable with the "textShadow" theme object */
/* note: the "default" key generates a simple "text-shadow" class (instead of "text-shadow-default") */
.text-shadow-[key] {
  text-shadow: [value];
}

/* configurable with the "textDecorationStyle" theme object */
.line-[key] {
  text-decoration-style: [value];
}

/* configurable with the "textDecorationColor" theme object */
.line-[key] {
  text-decoration-color: [value];
}

/* generated when the "ellipsis" option is set to true */
.ellipsis {
  text-overflow: ellipsis;
}
.no-ellipsis {
  text-overflow: clip;
}

/* generated when the "hyphens" option is set to true */
.hyphens-none {
  hyphens: none;
}
.hyphens-manual {
  hyphens: manual;
}
.hyphens-auto {
  hyphens: auto;
}

/* generated when the "kerning" option is set to true */
.kerning {
  font-kerning: normal;
}
.kerning-none {
  font-kerning: none;
}
.kerning-auto {
  font-kerning: auto;
}

/* generated when the "textUnset" option is set to true */
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

/* configurable with the "fontVariantCaps" theme object */
.caps-normal {
  font-variant-caps: normal;
}
.caps-small {
  font-variant-caps: small-caps;
}
.caps-all-small {
  font-variant-caps: all-small-caps;
}
.caps-petite {
  font-variant-caps: petite-caps;
}
.caps-unicase {
  font-variant-caps: unicase;
}
.caps-titling {
  font-variant-caps: titling-caps;
}

/* configurable with the "fontVariantNumeric" theme object */
.nums-normal {
  font-variant-numeric: normal;
}
.nums-ordinal {
  font-variant-numeric: ordinal;
}
.nums-slashed-zero {
  font-variant-numeric: slashed-zero;
}
.nums-lining {
  font-variant-numeric: lining-nums;
}
.nums-oldstyle {
  font-variant-numeric: oldstyle-nums;
}
.nums-proportional {
  font-variant-numeric: proportional-nums;
}
.nums-tabular {
  font-variant-numeric: tabular-nums;
}
.nums-diagonal-fractions {
  font-variant-numeric: diagonal-fractions;
}
.nums-stacked-fractions {
  font-variant-numeric: stacked-fractions;
}

/* configurable with the "fontVariantLigatures" theme object */
.ligatures-normal {
  font-variant-ligatures: normal;
}
.ligatures-none {
  font-variant-ligatures: none;
}
.ligatures-common {
  font-variant-ligatures: common-ligatures;
}
.ligatures-no-common {
  font-variant-ligatures: no-common-ligatures;
}
.ligatures-discretionary {
  font-variant-ligatures: discretionary-ligatures;
}
.ligatures-no-discretionary {
  font-variant-ligatures: no-discretionary-ligatures;
}
.ligatures-historical {
  font-variant-ligatures: historical-ligatures;
}
.ligatures-no-historical {
  font-variant-ligatures: no-historical-ligatures;
}
.ligatures-contextual {
  font-variant-ligatures: contextual;
}
.ligatures-no-contextual {
  font-variant-ligatures: no-contextual;
}

/* configurable with the "textRendering" theme object */
.text-rendering-auto {
  text-rendering: auto;
}
.text-optimize-legibility {
  text-rendering: optimizeLegibility;
}
.text-optimize-speed {
  text-rendering: optimizeSpeed;
}
.text-geometric-precision {
  text-rendering: geometricPrecision;
}
```

The plugin also generates components for text styles. The above config example would generate something like this:

```css
.c-h1 {
  font-weight: 700;
  line-height: 1.25;
  font-size: 3rem;
}
@media (min-width: 640px) {
  .c-h1 {
    font-size: 4rem;
  }
}
.c-h2 {
  font-weight: 800;
  line-height: 1.25;
  font-size: 2.25rem;
}
@media (min-width: 640px) {
  .c-h2 {
    font-size: 3rem;
  }
}
.c-h3 {
  font-weight: 700;
  line-height: 1.25;
  font-size: 2.25rem;
}
.c-h4 {
  font-weight: 700;
  line-height: 1.25;
  font-size: 1.875rem;
}
.c-h5 {
  font-weight: 700;
  line-height: 1.25;
  font-size: 1.5rem;
}
.c-h6 {
  font-weight: 700;
  line-height: 1.25;
  font-size: 1.25rem;
}

.c-link {
  font-weight: 700;
  color: #63b3ed;
}
.c-link:hover {
  color: #3182ce;
  text-decoration: underline;
}

.c-rich-text {
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.625;
}
.c-rich-text > * + * {
  margin-top: 1em;
}
.c-rich-text h1 {
  font-weight: 700;
  line-height: 1.25;
  font-size: 3rem;
}
@media (min-width: 640px) {
  .c-rich-text h1 {
    font-size: 4rem;
  }
}
.c-rich-text h2 {
  font-weight: 800;
  line-height: 1.25;
  font-size: 2.25rem;
}
@media (min-width: 640px) {
  .c-rich-text h2 {
    font-size: 3rem;
  }
}
.c-rich-text h3 {
  font-weight: 700;
  line-height: 1.25;
  font-size: 2.25rem;
}
.c-rich-text h4 {
  font-weight: 700;
  line-height: 1.25;
  font-size: 1.875rem;
}
.c-rich-text h5 {
  font-weight: 700;
  line-height: 1.25;
  font-size: 1.5rem;
}
.c-rich-text h6 {
  font-weight: 700;
  line-height: 1.25;
  font-size: 1.25rem;
}
.c-rich-text ul {
  list-style-type: disc;
}
.c-rich-text ol {
  list-style-type: decimal;
}
.c-rich-text a {
  font-weight: 700;
  color: #63b3ed;
}
.c-rich-text a:hover {
  color: #3182ce;
  text-decoration: underline;
}
.c-rich-text b, .c-rich-text strong {
  font-weight: 700;
}
.c-rich-text i, .c-rich-text em {
  font-style: italic;
}
```
