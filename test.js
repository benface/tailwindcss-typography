const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig')();
const typographyPlugin = require('./index.js');

const disabledModules = {};
Object.keys(defaultConfig.modules).forEach(module => {
  disabledModules[module] = false;
});

const generatePluginCss = (options = {}) => {
  return postcss(tailwindcss({
    modules: disabledModules,
    plugins: [typographyPlugin(options)],
  })).process('@tailwind utilities;', {
    from: undefined,
  }).then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('options are not required', () => {
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
    `);
  });
});

test('all the options are working as they should', () => {
  return generatePluginCss({
    indents: {
      '1': '1px',
      '2': '2px',
    },
    textShadows: {
      'default': '0 2px 5px rgba(0, 0, 0, .5)',
      'lg': '0 2px 10px rgba(0, 0, 0, .5)',
    },
  }).then(css => {
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
      .indent-1 {
        text-indent: 1px;
      }
      .indent-2 {
        text-indent: 2px;
      }
      .text-shadow {
        text-shadow: 0 2px 5px rgba(0, 0, 0, .5);
      }
      .text-shadow-lg {
        text-shadow: 0 2px 10px rgba(0, 0, 0, .5);
      }
    `);
  });
});

test('variants are supported', () => {
  return generatePluginCss({
    variants: ['hover', 'active'],
  }).then(css => {
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
      .hover\\:ellipsis:hover {
        text-overflow: ellipsis;
      }
      .hover\\:hyphens-none:hover {
        hyphens: none;
      }
      .hover\\:hyphens-manual:hover {
        hyphens: manual;
      }
      .hover\\:hyphens-auto:hover {
        hyphens: auto;
      }
      .active\\:ellipsis:active {
        text-overflow: ellipsis;
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
