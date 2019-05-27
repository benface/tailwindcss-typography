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
      @media (min-width: 640px) {
        .sm\\:ellipsis {
          text-overflow: ellipsis;
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
      }
    `);
  });
});

test('the default utilities can be disabled', () => {
  return generatePluginCss({}, {
    hyphens: false,
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .ellipsis {
        text-overflow: ellipsis;
      }
      @media (min-width: 640px) {
        .sm\\:ellipsis {
          text-overflow: ellipsis;
        }
      }
    `);
  });
});

test('text indent and text shadow utilities can be customized', () => {
  return generatePluginCss({
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
      ellipsis: [],
      hyphens: [],
      textIndent: [],
      textShadow: [],
    },
  }, {
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .indent-1 {
        text-indent: 0.25rem;
      }
      .indent-2 {
        text-indent: 0.5rem;
      }
      .text-shadow {
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
      }
      .text-shadow-lg {
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      }
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
    },
  }, {
    ellipsis: false,
    hyphens: false,
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
    },
  }, {
    ellipsis: false,
    hyphens: false,
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
    },
  }, {
    ellipsis: false,
    hyphens: false,
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
    },
  }, {
    ellipsis: false,
    hyphens: false,
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
    },
  }, {
    ellipsis: false,
    hyphens: false,
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
    },
  }, {
    ellipsis: false,
    hyphens: false,
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
    },
  }, {
    ellipsis: false,
    hyphens: false,
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
    },
  }, {
    ellipsis: false,
    hyphens: false,
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
    variants: {
      ellipsis: ['hover'],
      hyphens: ['active'],
    },
  }, {
    textUnset: false,
  }).then(css => {
    expect(css).toMatchCss(`
      .ellipsis {
        text-overflow: ellipsis;
      }
      .hover\\:ellipsis:hover {
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
      .active\\:hyphens-none:active {
        hyphens: none;
      }
      .active\\:hyphens-manual:active {
        hyphens: manual;
      }
      .active\\:hyphens-auto:active {
        hyphens: auto;
      }
    `);
  });
});
