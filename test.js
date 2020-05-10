const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const typographyPlugin = require('./index.js');

const generatePluginCss = (config, pluginOptions = {}) => {
  return postcss(
    tailwindcss(
      _.merge({
        theme: {
          screens: {
            'sm': '640px',
          },
          colors: {},
        },
        corePlugins: false,
        plugins: [
          typographyPlugin(pluginOptions),
        ],
      }, config)
    )
  )
  .process('@tailwind components; @tailwind utilities', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin generates some utilities and responsive variants by default', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .line-solid {
        text-decoration-style: solid;
      }
      .line-double {
        text-decoration-style: double;
      }
      .line-dotted {
        text-decoration-style: dotted;
      }
      .line-dashed {
        text-decoration-style: dashed;
      }
      .line-wavy {
        text-decoration-style: wavy;
      }
      .ellipsis {
        text-overflow: ellipsis;
      }
      .no-ellipsis {
        text-overflow: clip;
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
      .kerning {
        font-kerning: normal;
      }
      .kerning-none {
        font-kerning: none;
      }
      .kerning-auto {
        font-kerning: auto;
      }
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
      @media (min-width: 640px) {
        .sm\\:line-solid {
          text-decoration-style: solid;
        }
        .sm\\:line-double {
          text-decoration-style: double;
        }
        .sm\\:line-dotted {
          text-decoration-style: dotted;
        }
        .sm\\:line-dashed {
          text-decoration-style: dashed;
        }
        .sm\\:line-wavy {
          text-decoration-style: wavy;
        }
        .sm\\:ellipsis {
          text-overflow: ellipsis;
        }
        .sm\\:no-ellipsis {
          text-overflow: clip;
        }
        .sm\\:hyphens-none {
          hyphens: none;
        }
        .sm\\:hyphens-manual {
          hyphens: manual;
        }
        .sm\\:hyphens-auto {
          hyphens: auto;
        }
        .sm\\:kerning {
          font-kerning: normal;
        }
        .sm\\:kerning-none {
          font-kerning: none;
        }
        .sm\\:kerning-auto {
          font-kerning: auto;
        }
        .sm\\:font-family-unset {
          font-family: inherit;
        }
        .sm\\:font-weight-unset {
          font-weight: inherit;
        }
        .sm\\:font-style-unset {
          font-style: inherit;
        }
        .sm\\:text-size-unset {
          font-size: inherit;
        }
        .sm\\:text-align-unset {
          text-align: inherit;
        }
        .sm\\:leading-unset {
          line-height: inherit;
        }
        .sm\\:tracking-unset {
          letter-spacing: inherit;
        }
        .sm\\:text-color-unset {
          color: inherit;
        }
        .sm\\:text-transform-unset {
          text-transform: inherit;
        }
        .sm\\:caps-normal {
          font-variant-caps: normal;
        }
        .sm\\:caps-small {
          font-variant-caps: small-caps;
        }
        .sm\\:caps-all-small {
          font-variant-caps: all-small-caps;
        }
        .sm\\:caps-petite {
          font-variant-caps: petite-caps;
        }
        .sm\\:caps-unicase {
          font-variant-caps: unicase;
        }
        .sm\\:caps-titling {
          font-variant-caps: titling-caps;
        }
        .sm\\:nums-normal {
          font-variant-numeric: normal;
        }
        .sm\\:nums-ordinal {
          font-variant-numeric: ordinal;
        }
        .sm\\:nums-slashed-zero {
          font-variant-numeric: slashed-zero;
        }
        .sm\\:nums-lining {
          font-variant-numeric: lining-nums;
        }
        .sm\\:nums-oldstyle {
          font-variant-numeric: oldstyle-nums;
        }
        .sm\\:nums-proportional {
          font-variant-numeric: proportional-nums;
        }
        .sm\\:nums-tabular {
          font-variant-numeric: tabular-nums;
        }
        .sm\\:nums-diagonal-fractions {
          font-variant-numeric: diagonal-fractions;
        }
        .sm\\:nums-stacked-fractions {
          font-variant-numeric: stacked-fractions;
        }
        .sm\\:ligatures-normal {
          font-variant-ligatures: normal;
        }
        .sm\\:ligatures-none {
          font-variant-ligatures: none;
        }
        .sm\\:ligatures-common {
          font-variant-ligatures: common-ligatures;
        }
        .sm\\:ligatures-no-common {
          font-variant-ligatures: no-common-ligatures;
        }
        .sm\\:ligatures-discretionary {
          font-variant-ligatures: discretionary-ligatures;
        }
        .sm\\:ligatures-no-discretionary {
          font-variant-ligatures: no-discretionary-ligatures;
        }
        .sm\\:ligatures-historical {
          font-variant-ligatures: historical-ligatures;
        }
        .sm\\:ligatures-no-historical {
          font-variant-ligatures: no-historical-ligatures;
        }
        .sm\\:ligatures-contextual {
          font-variant-ligatures: contextual;
        }
        .sm\\:ligatures-no-contextual {
          font-variant-ligatures: no-contextual;
        }
        .sm\\:text-rendering-auto {
          text-rendering: auto;
        }
        .sm\\:text-optimize-legibility {
          text-rendering: optimizeLegibility;
        }
        .sm\\:text-optimize-speed {
          text-rendering: optimizeSpeed;
        }
        .sm\\:text-geometric-precision {
          text-rendering: geometricPrecision;
        }
      }
    `);
  });
});

test('the font variant utilities can be disabled', () => {
  return generatePluginCss({
    theme: {
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
    variants: {
      textDecorationStyle: [],
      textDecorationColor: [],
      ellipsis: [],
      hyphens: [],
      kerning: [],
      textUnset: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .line-solid {
        text-decoration-style: solid;
      }
      .line-double {
        text-decoration-style: double;
      }
      .line-dotted {
        text-decoration-style: dotted;
      }
      .line-dashed {
        text-decoration-style: dashed;
      }
      .line-wavy {
        text-decoration-style: wavy;
      }
      .ellipsis {
        text-overflow: ellipsis;
      }
      .no-ellipsis {
        text-overflow: clip;
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
      .kerning {
        font-kerning: normal;
      }
      .kerning-none {
        font-kerning: none;
      }
      .kerning-auto {
        font-kerning: auto;
      }
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
    `);
  });
});

test('the ellipsis, hyphens, and text unset utilities can be disabled', () => {
  return generatePluginCss({
    theme: {
      textDecorationStyle: {},
      textDecorationColor: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(``);
  });
});

test('the text decoration color utilities default to the theme’s colors', () => {
  return generatePluginCss({
    theme: {
      colors: {
        'yellow': '#ff0',
        'white': '#fff',
      },
      textDecorationStyle: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
    variants: {
      textDecorationStyle: [],
      textDecorationColor: [],
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .line-yellow {
        text-decoration-color: #ff0;
      }
      .line-white {
        text-decoration-color: #fff;
      }
    `);
  });
});

test('the text indent, text shadow, and text decoration utilities can be customized', () => {
  return generatePluginCss({
    theme: {
      textIndent: {
        '1': '0.25rem',
        '2': '0.5rem',
        '-1': '-0.25rem',
      },
      textShadow: {
        'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
        'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
      },
      textDecorationStyle: {
        'groovy': 'wavy',
      },
      textDecorationColor: {
        'red': '#f00',
        'green': '#0f0',
        'blue': '#00f',
      },
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
    variants: {
      textIndent: [],
      textShadow: [],
      textDecorationStyle: [],
      textDecorationColor: [],
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .indent-1 {
        text-indent: 0.25rem;
      }
      .indent-2 {
        text-indent: 0.5rem;
      }
      .-indent-1 {
        text-indent: -0.25rem;
      }
      .text-shadow {
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
      }
      .text-shadow-lg {
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      }
      .line-groovy {
        text-decoration-style: wavy;
      }
      .line-red {
        text-decoration-color: #f00;
      }
      .line-green {
        text-decoration-color: #0f0;
      }
      .line-blue {
        text-decoration-color: #00f;
      }
    `);
  });
});

test('the text decoration color utilities can use nested object notation', () => {
  return generatePluginCss({
    theme: {
      colors: {
        indigo: {
          lighter: '#b3bcf5',
          default: '#5c6ac4',
          dark: '#202e78',
        },
      },
      textDecorationStyle: {},
      textDecorationColor: theme => theme('colors'),
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
    variants: {
      textDecorationStyle: [],
      textDecorationColor: [],
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .line-indigo-lighter {
        text-decoration-color: #b3bcf5;
      }
      .line-indigo {
        text-decoration-color: #5c6ac4;
      }
      .line-indigo-dark {
        text-decoration-color: #202e78;
      }
    `);
  });
});

test('the font variant utilities can be extended', () => {
  return generatePluginCss({
    theme: {
      textDecorationStyle: {},
      textDecorationColor: {},
      extend: {
        fontVariantCaps: {
          'inherit': 'inherit',
        },
        fontVariantNumeric: {
          'initial': 'initial',
        },
        fontVariantLigatures: {
          'revert': 'revert',
        },
      },
    },
    variants: {
      fontVariantCaps: [],
      fontVariantNumeric: [],
      fontVariantLigatures: [],
      textRendering: [],
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
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
      .caps-inherit {
        font-variant-caps: inherit;
      }
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
      .nums-initial {
        font-variant-numeric: initial;
      }
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
      .ligatures-revert {
        font-variant-ligatures: revert;
      }
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
    `);
  });
});

test('text style components can be generated', () => {
  return generatePluginCss({
    theme: {
      fontSize: {
        'heading-xs': '24px',
        'heading-sm': '30px',
        'heading': '36px',
        'heading-lg': '48px',
        'heading-xl': '64px',
      },
      textStyles: theme => ({
        h1: {
          fontSize: theme('fontSize.heading-xl'),
        },
        h2: {
          fontSize: theme('fontSize.heading-lg'),
        },
        h3: {
          fontSize: theme('fontSize.heading'),
        },
        h4: {
          fontSize: theme('fontSize.heading-sm'),
        },
        h5: {
          fontSize: theme('fontSize.heading-xs'),
        },
      }),
      textDecorationStyle: {},
      textDecorationColor: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .c-h1 {
        font-size: 64px;
      }
      .c-h2 {
        font-size: 48px;
      }
      .c-h3 {
        font-size: 36px;
      }
      .c-h4 {
        font-size: 30px;
      }
      .c-h5 {
        font-size: 24px;
      }
    `);
  });
});

test('the component prefix can be customized', () => {
  return generatePluginCss({
    theme: {
      fontSize: {
        'heading-xl': '64px',
      },
      textStyles: theme => ({
        h1: {
          fontSize: theme('fontSize.heading-xl'),
        },
      }),
      textDecorationStyle: {},
      textDecorationColor: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
    componentPrefix: '',
  }).then(css => {
    expect(css).toMatchCss(`
      .h1 {
        font-size: 64px;
      }
    `);
  });
});

test('text styles can extend other text styles', () => {
  return generatePluginCss({
    theme: {
      fontWeight: {
        'bold': '700',
      },
      fontSize: {
        'heading-xs': '24px',
        'heading-sm': '30px',
        'heading': '36px',
        'heading-lg': '48px',
        'heading-xl': '64px',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'normal': '1.5',
      },
      textStyles: theme => ({
        heading: {
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.tight'),
        },
        h1: {
          extends: 'heading',
          fontSize: theme('fontSize.heading-xl'),
        },
        h2: {
          extends: 'heading',
          fontSize: theme('fontSize.heading-lg'),
        },
        h3: {
          extends: 'heading',
          fontSize: theme('fontSize.heading'),
        },
      }),
      textDecorationStyle: {},
      textDecorationColor: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .c-heading {
        font-weight: 700;
        line-height: 1.25;
      }
      .c-h1 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 64px;
      }
      .c-h2 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 48px;
      }
      .c-h3 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 36px;
      }
    `);
  });
});

test('text styles can extend more than one other text style', () => {
  return generatePluginCss({
    theme: {
      fontFamily: {
        'default': 'sans-serif',
        'heading': 'Helvetica',
      },
      fontWeight: {
        'bold': '700',
        'extrabold': '800',
      },
      fontSize: {
        'heading-xs': '24px',
        'heading-sm': '30px',
        'heading': '36px',
        'heading-lg': '48px',
        'heading-xl': '64px',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'normal': '1.5',
      },
      textStyles: theme => ({
        heading: {
          fontFamily: theme('fontFamily.heading'),
          fontWeight: theme('fontWeight.bold'),
        },
        largeHeading: {
          fontWeight: theme('fontWeight.extrabold'),
          lineHeight: theme('lineHeight.tight'),
        },
        h1: {
          extends: ['heading', 'largeHeading'],
          fontSize: theme('fontSize.heading-xl'),
        },
        h2: {
          extends: ['heading', 'largeHeading'],
          fontSize: theme('fontSize.heading-lg'),
        },
        h3: {
          extends: 'heading',
          fontSize: theme('fontSize.heading'),
        },
      }),
      textDecorationStyle: {},
      textDecorationColor: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .c-heading {
        font-family: Helvetica;
        font-weight: 700;
      }
      .c-large-heading {
        font-weight: 800;
        line-height: 1.25;
      }
      .c-h1 {
        font-family: Helvetica;
        font-weight: 800;
        line-height: 1.25;
        font-size: 64px;
      }
      .c-h2 {
        font-family: Helvetica;
        font-weight: 800;
        line-height: 1.25;
        font-size: 48px;
      }
      .c-h3 {
        font-family: Helvetica;
        font-weight: 700;
        font-size: 36px;
      }
    `);
  });
});

test('text styles support arrays in fontFamily and fontSize properties', () => {
  return generatePluginCss({
    theme: {
      fontFamily: {
        'default': 'sans-serif',
        'heading': ['Helvetica', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        'bold': '700',
        'extrabold': '800',
      },
      fontSize: {
        'heading-xs': ['24px', '36px'],
        'heading-sm': ['30px', '45px'],
        'heading': ['36px', '54px'],
        'heading-lg': ['48px', '72px'],
        'heading-xl': ['64px', '96px'],
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'normal': '1.5',
      },
      textStyles: theme => ({
        heading: {
          fontFamily: theme('fontFamily.heading'),
          fontWeight: theme('fontWeight.bold'),
        },
        largeHeading: {
          fontWeight: theme('fontWeight.extrabold'),
        },
        h1: {
          extends: ['heading', 'largeHeading'],
          fontSize: theme('fontSize.heading-xl'),
        },
        h2: {
          extends: ['heading', 'largeHeading'],
          fontSize: theme('fontSize.heading-lg'),
        },
        h3: {
          extends: 'heading',
          fontSize: theme('fontSize.heading'),
        },
      }),
      textDecorationStyle: {},
      textDecorationColor: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .c-heading {
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 700;
      }
      .c-large-heading {
        font-weight: 800;
      }
      .c-h1 {
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 800;
        font-size: 64px;
        line-height: 96px;
      }
      .c-h2 {
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 800;
        font-size: 48px;
        line-height: 72px;
      }
      .c-h3 {
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 700;
        font-size: 36px;
        line-height: 54px;
      }
    `);
  });
});

test('text style components can style their children', () => {
  return generatePluginCss({
    theme: {
      fontWeight: {
        'normal': '400',
        'bold': '700',
      },
      fontSize: {
        'sm': '14px',
        'default': '16px',
        'lg': '18px',
        'xl': '20px',
        'heading-xs': '24px',
        'heading-sm': '30px',
        'heading': '36px',
        'heading-lg': '48px',
        'heading-xl': '64px',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'normal': '1.5',
        'loose': '2',
      },
      textStyles: theme => ({
        heading: {
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.tight'),
        },
        h1: {
          extends: 'heading',
          fontSize: theme('fontSize.heading-xl'),
        },
        h2: {
          extends: 'heading',
          fontSize: theme('fontSize.heading-lg'),
        },
        h3: {
          extends: 'heading',
          fontSize: theme('fontSize.heading'),
        },
        richText: {
          fontWeight: theme('fontWeight.normal'),
          fontSize: theme('fontSize.default'),
          lineHeight: theme('lineHeight.loose'),
          'h1': {
            extends: 'h1',
          },
          'h2': {
            extends: 'h2',
          },
          'h3': {
            extends: 'h3',
          },
        },
      }),
      textDecorationStyle: {},
      textDecorationColor: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .c-heading {
        font-weight: 700;
        line-height: 1.25;
      }
      .c-h1 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 64px;
      }
      .c-h2 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 48px;
      }
      .c-h3 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 36px;
      }
      .c-rich-text {
        font-weight: 400;
        font-size: 16px;
        line-height: 2;
      }
      .c-rich-text h1 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 64px;
      }
      .c-rich-text h2 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 48px;
      }
      .c-rich-text h3 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 36px;
      }
    `);
  });
});

test('text styles can be responsive', () => {
  return generatePluginCss({
    theme: {
      fontWeight: {
        'bold': '700',
      },
      fontSize: {
        'heading-xs': '24px',
        'heading-sm': '30px',
        'heading': '36px',
        'heading-lg': '48px',
        'heading-xl': '64px',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'normal': '1.5',
      },
      textStyles: theme => ({
        heading: {
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.tight'),
        },
        h1: {
          extends: 'heading',
          fontSize: theme('fontSize.heading-lg'),
          '@screen sm': {
            fontSize: theme('fontSize.heading-xl'),
          }
        },
        h2: {
          extends: 'heading',
          fontSize: theme('fontSize.heading'),
          '@screen sm': {
            fontSize: theme('fontSize.heading-lg'),
          }
        },
        h3: {
          extends: 'heading',
          fontSize: theme('fontSize.heading-sm'),
          '@screen sm': {
            fontSize: theme('fontSize.heading'),
          }
        },
      }),
      textDecorationStyle: {},
      textDecorationColor: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .c-heading {
        font-weight: 700;
        line-height: 1.25;
      }
      .c-h1 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 48px;
      }
      @media (min-width: 640px) {
        .c-h1 {
          font-size: 64px;
        }
      }
      .c-h2 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 36px;
      }
      @media (min-width: 640px) {
        .c-h2 {
          font-size: 48px;
        }
      }
      .c-h3 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 30px;
      }
      @media (min-width: 640px) {
        .c-h3 {
          font-size: 36px;
        }
      }
    `);
  });
});

test('text styles can be set to not be output', () => {
  return generatePluginCss({
    theme: {
      fontWeight: {
        'bold': '700',
      },
      fontSize: {
        'heading-xs': '24px',
        'heading-sm': '30px',
        'heading': '36px',
        'heading-lg': '48px',
        'heading-xl': '64px',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'normal': '1.5',
      },
      textStyles: theme => ({
        heading: {
          output: false,
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.tight'),
          fontSize: theme('fontSize.heading'),
        },
        h1: {
          extends: 'heading',
          fontSize: theme('fontSize.heading-xl'),
        },
      }),
      textDecorationStyle: {},
      textDecorationColor: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .c-h1 {
        font-weight: 700;
        line-height: 1.25;
        font-size: 64px;
      }
    `);
  });
});

test('all these options can be used to generate a full-featured rich text component', () => {
  return generatePluginCss({
    theme: {
      colors: {
        'link': '#2083c0',
      },
      fontFamily: {
        'default': 'sans-serif',
        'heading': 'Helvetica',
      },
      fontWeight: {
        'normal': '400',
        'bold': '700',
      },
      fontSize: {
        'sm': '14px',
        'default': '16px',
        'lg': '18px',
        'xl': '20px',
        'heading-xs': '24px',
        'heading-sm': '30px',
        'heading': '36px',
        'heading-lg': '48px',
        'heading-xl': '64px',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'normal': '1.5',
        'loose': '2',
      },
      textStyles: theme => ({
        heading: {
          output: false,
          fontFamily: theme('fontFamily.heading'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.tight'),
        },
        link: {
          output: false,
          fontWeight: theme('fontWeight.bold'),
          color: theme('colors.link'),
          '&:hover': {
            opacity: '0.5',
            textDecoration: 'underline',
          },
        },
        richText: {
          fontFamily: theme('fontFamily.default'),
          fontWeight: theme('fontWeight.normal'),
          fontSize: theme('fontSize.default'),
          lineHeight: theme('lineHeight.loose'),
          '> * + *': {
            marginTop: '1em',
          },
          'h1': {
            extends: 'heading',
            fontSize: theme('fontSize.heading-xl'),
          },
          'h2': {
            extends: 'heading',
            fontSize: theme('fontSize.heading-lg'),
          },
          'h3': {
            extends: 'heading',
            fontSize: theme('fontSize.heading'),
          },
          'h4': {
            extends: 'heading',
            fontSize: theme('fontSize.heading-sm'),
          },
          'h5': {
            extends: 'heading',
            fontSize: theme('fontSize.heading-xs'),
          },
          'h6': {
            extends: 'heading',
            fontSize: theme('fontSize.xl'),
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
      textDecorationStyle: {},
      textDecorationColor: {},
      fontVariantCaps: {},
      fontVariantNumeric: {},
      fontVariantLigatures: {},
      textRendering: {},
    },
  }, {
    ellipsis: false,
    hyphens: false,
    kerning: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .c-rich-text {
        font-family: sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 2;
      }
      .c-rich-text > * + * {
        margin-top: 1em;
      }
      .c-rich-text h1 {
        font-family: Helvetica;
        font-weight: 700;
        line-height: 1.25;
        font-size: 64px;
      }
      .c-rich-text h2 {
        font-family: Helvetica;
        font-weight: 700;
        line-height: 1.25;
        font-size: 48px;
      }
      .c-rich-text h3 {
        font-family: Helvetica;
        font-weight: 700;
        line-height: 1.25;
        font-size: 36px;
      }
      .c-rich-text h4 {
        font-family: Helvetica;
        font-weight: 700;
        line-height: 1.25;
        font-size: 30px;
      }
      .c-rich-text h5 {
        font-family: Helvetica;
        font-weight: 700;
        line-height: 1.25;
        font-size: 24px;
      }
      .c-rich-text h6 {
        font-family: Helvetica;
        font-weight: 700;
        line-height: 1.25;
        font-size: 20px;
      }
      .c-rich-text ul {
        list-style-type: disc;
      }
      .c-rich-text ol {
        list-style-type: decimal;
      }
      .c-rich-text a {
        font-weight: 700;
        color: #2083c0;
      }
      .c-rich-text a:hover {
        opacity: 0.5;
        text-decoration: underline;
      }
      .c-rich-text b, .c-rich-text strong {
        font-weight: 700;
      }
      .c-rich-text i, .c-rich-text em {
        font-style: italic;
      }
    `);
  });
});

test('variants can be customized', () => {
  return generatePluginCss({
    theme: {
      colors: {
        'red': '#f00',
      },
    },
    variants: {
      textDecorationStyle: ['hover'],
      textDecorationColor: ['active'],
      ellipsis: ['hover'],
      hyphens: ['active'],
      kerning: ['focus'],
      textUnset: [],
      fontVariantCaps: ['focus', 'responsive'],
      fontVariantNumeric: ['group-hover'],
      fontVariantLigatures: [],
      textRendering: [],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .line-solid {
        text-decoration-style: solid;
      }
      .line-double {
        text-decoration-style: double;
      }
      .line-dotted {
        text-decoration-style: dotted;
      }
      .line-dashed {
        text-decoration-style: dashed;
      }
      .line-wavy {
        text-decoration-style: wavy;
      }
      .hover\\:line-solid:hover {
        text-decoration-style: solid;
      }
      .hover\\:line-double:hover {
        text-decoration-style: double;
      }
      .hover\\:line-dotted:hover {
        text-decoration-style: dotted;
      }
      .hover\\:line-dashed:hover {
        text-decoration-style: dashed;
      }
      .hover\\:line-wavy:hover {
        text-decoration-style: wavy;
      }
      .line-red {
        text-decoration-color: #f00;
      }
      .active\\:line-red:active {
        text-decoration-color: #f00;
      }
      .ellipsis {
        text-overflow: ellipsis;
      }
      .no-ellipsis {
        text-overflow: clip;
      }
      .hover\\:ellipsis:hover {
        text-overflow: ellipsis;
      }
      .hover\\:no-ellipsis:hover {
        text-overflow: clip;
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
      .active\\:hyphens-none:active {
        hyphens: none;
      }
      .active\\:hyphens-manual:active {
        hyphens: manual;
      }
      .active\\:hyphens-auto:active {
        hyphens: auto;
      }
      .kerning {
        font-kerning: normal;
      }
      .kerning-none {
        font-kerning: none;
      }
      .kerning-auto {
        font-kerning: auto;
      }
      .focus\\:kerning:focus {
        font-kerning: normal;
      }
      .focus\\:kerning-none:focus {
        font-kerning: none;
      }
      .focus\\:kerning-auto:focus {
        font-kerning: auto;
      }
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
      .focus\\:caps-normal:focus {
        font-variant-caps: normal;
      }
      .focus\\:caps-small:focus {
        font-variant-caps: small-caps;
      }
      .focus\\:caps-all-small:focus {
        font-variant-caps: all-small-caps;
      }
      .focus\\:caps-petite:focus {
        font-variant-caps: petite-caps;
      }
      .focus\\:caps-unicase:focus {
        font-variant-caps: unicase;
      }
      .focus\\:caps-titling:focus {
        font-variant-caps: titling-caps;
      }
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
      .group:hover .group-hover\\:nums-normal {
        font-variant-numeric: normal;
      }
      .group:hover .group-hover\\:nums-ordinal {
        font-variant-numeric: ordinal;
      }
      .group:hover .group-hover\\:nums-slashed-zero {
        font-variant-numeric: slashed-zero;
      }
      .group:hover .group-hover\\:nums-lining {
        font-variant-numeric: lining-nums;
      }
      .group:hover .group-hover\\:nums-oldstyle {
        font-variant-numeric: oldstyle-nums;
      }
      .group:hover .group-hover\\:nums-proportional {
        font-variant-numeric: proportional-nums;
      }
      .group:hover .group-hover\\:nums-tabular {
        font-variant-numeric: tabular-nums;
      }
      .group:hover .group-hover\\:nums-diagonal-fractions {
        font-variant-numeric: diagonal-fractions;
      }
      .group:hover .group-hover\\:nums-stacked-fractions {
        font-variant-numeric: stacked-fractions;
      }
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
      @media (min-width: 640px) {
        .sm\\:caps-normal {
          font-variant-caps: normal;
        }
        .sm\\:caps-small {
          font-variant-caps: small-caps;
        }
        .sm\\:caps-all-small {
          font-variant-caps: all-small-caps;
        }
        .sm\\:caps-petite {
          font-variant-caps: petite-caps;
        }
        .sm\\:caps-unicase {
          font-variant-caps: unicase;
        }
        .sm\\:caps-titling {
          font-variant-caps: titling-caps;
        }
        .sm\\:focus\\:caps-normal:focus {
          font-variant-caps: normal;
        }
        .sm\\:focus\\:caps-small:focus {
          font-variant-caps: small-caps;
        }
        .sm\\:focus\\:caps-all-small:focus {
          font-variant-caps: all-small-caps;
        }
        .sm\\:focus\\:caps-petite:focus {
          font-variant-caps: petite-caps;
        }
        .sm\\:focus\\:caps-unicase:focus {
          font-variant-caps: unicase;
        }
        .sm\\:focus\\:caps-titling:focus {
          font-variant-caps: titling-caps;
        }
      }
    `);
  });
});
