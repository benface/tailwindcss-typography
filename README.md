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
    ellipsis: ['responsive'],
    hyphens: ['responsive'],
    textUnset: ['responsive'],
    caps: ['responsive'],
    nums: ['responsive'],
    ligatures: ['responsive'],
    kern: ['responsive'],
  },
  plugins: [
    require('tailwindcss-typography')({
      // all these options default to the values specified here
      ellipsis: true,         // whether to generate ellipsis utilities
      hyphens: true,          // whether to generate hyphenation utilities
      textUnset: true,        // whether to generate utilities to unset text properties
      caps: true,             // whether to generate utilities to use alternate glyphs for capital letters
      nums: true,             // whether to generate utilities to use alternate glyphs for numbers, fractions, and ordinal markers
      ligatures: true,        // whether to generate ligature utilities
      kern: true,             // whether to generate kerning utilities
      componentPrefix: 'c-',  // the prefix to use for text style classes
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
/* note: the "default" key generates a simple "text-shadow" class (instead of "text-shadow-default") */
.text-shadow-[key] {
  text-shadow: [value];
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

/* generated when the "caps" option is set to true */
.normal-caps {
  font-variant-caps: normal;
}
.small-caps {
  font-variant-caps: small-caps;
}
.all-small-caps {
  font-variant-caps: all-small-caps;
}
.petite-caps {
  font-variant-caps: petite-caps;
}
.unicase {
  font-variant-caps: unicase;
}
.titling-caps {
  font-variant-caps: titling-caps;
}

/* generated when the "nums" option is set to true */
.normal-nums {
  font-variant-numeric: normal;
}
.ordinal-nums {
  font-variant-numeric: ordinal;
}
.slashed-zeros {
  font-variant-numeric: slashed-zero;
}
.lining-nums {
  font-variant-numeric: lining-nums;
}
.oldstyle-nums {
  font-variant-numeric: oldstyle-nums;
}
.proportional-nums {
  font-variant-numeric: proportional-nums;
}
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
.diagonal-fractions {
  font-variant-numeric: diagonal-fractions;
}
.stacked-fractions {
  font-variant-numeric: stacked-fractions;
}

/* generated when the "ligatures" option is set to true */
.normal-ligatures {
  font-variant-ligatures: normal;
}
.no-ligatures {
  font-variant-ligatures: none;
}
.common-ligatures {
  font-variant-ligatures: common-ligatures;
}
.no-common-ligatures {
  font-variant-ligatures: no-common-ligatures;
}
.discretionary-ligatures {
  font-variant-ligatures: discretionary-ligatures;
}
.no-discretionary-ligatures {
  font-variant-ligatures: no-discretionary-ligatures;
}
.historical-ligatures {
  font-variant-ligatures: historical-ligatures;
}
.no-historical-ligatures {
  font-variant-ligatures: no-historical-ligatures;
}
.contextual-ligatures {
  font-variant-ligatures: contextual;
}
.no-contextual-ligatures {
  font-variant-ligatures: no-contextual;
}

/* generated when the "kern" option is set to true */
.kern {
  font-feature-settings: 'kern';
  font-kerning: normal;
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
