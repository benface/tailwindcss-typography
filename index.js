const plugin = require('tailwindcss/plugin');
const _ = require('lodash');

const defaultOptions = {
  ellipsis: true,
  hyphens: true,
  kerning: true,
  textUnset: true,
  componentPrefix: 'c-',
};

const prefixNegativeModifiers = function(base, modifier) {
  return _.startsWith(modifier, '-') ? `-${base}-${modifier.slice(1)}` : `${base}-${modifier}`;
};

const flattenColorPalette = function(colors) {
  return _(colors)
    .flatMap((color, name) => {
      if (!_.isPlainObject(color)) {
        return [[name, color]];
      }
      return _.map(color, (value, key) => {
        const suffix = key === 'default' ? '' : `-${key}`;
        return [`${name}${suffix}`, value];
      });
    })
    .fromPairs()
    .value();
};

const camelCaseToKebabCase = function(string) {
  return string
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();
};

module.exports = plugin.withOptions(function(options = {}) {
  return function({ theme, variants, e, addUtilities, addComponents }) {
    options = _.defaults({}, options, defaultOptions);

    const textIndentUtilities = _.fromPairs(
      _.map(theme('textIndent'), (value, modifier) => {
        return [
          `.${e(prefixNegativeModifiers('indent', modifier))}`,
          {
            textIndent: value,
          },
        ];
      })
    );

    const textShadowUtilities = _.fromPairs(
      _.map(theme('textShadow'), (value, modifier) => {
        return [
          `.${e(`text-shadow${modifier === 'default' ? '' : `-${modifier}`}`)}`,
          {
            textShadow: value,
          },
        ];
      })
    );

    const textDecorationStyleUtilities = _.fromPairs(
      _.map(theme('textDecorationStyle'), (value, modifier) => {
        return [
          `.${e(`line-${modifier}`)}`,
          {
            textDecorationStyle: value,
          },
        ];
      })
    );

    const textDecorationColorUtilities = _.fromPairs(
      _.map(flattenColorPalette(theme('textDecorationColor')), (value, modifier) => {
        return [
          `.${e(`line-${modifier}`)}`,
          {
            textDecorationColor: value,
          },
        ];
      })
    );

    const ellipsisUtilities = options.ellipsis ? {
      '.ellipsis': {
        textOverflow: 'ellipsis',
      },
      '.no-ellipsis': {
        textOverflow: 'clip',
      },
    } : {};

    const hyphensUtilities = options.hyphens ? {
      '.hyphens-none': {
        hyphens: 'none',
      },
      '.hyphens-manual': {
        hyphens: 'manual',
      },
      '.hyphens-auto': {
        hyphens: 'auto',
      },
    } : {};

    const kerningUtilities = options.kerning ? {
      '.kerning': {
        fontKerning: 'normal',
      },
      '.kerning-none': {
        fontKerning: 'none',
      },
      '.kerning-auto': {
        fontKerning: 'auto',
      },
    } : {};

    const textUnsetUtilities = options.textUnset ? {
      '.font-family-unset': {
        fontFamily: 'inherit',
      },
      '.font-weight-unset': {
        fontWeight: 'inherit',
      },
      '.font-style-unset': {
        fontStyle: 'inherit',
      },
      '.text-size-unset': {
        fontSize: 'inherit',
      },
      '.text-align-unset': {
        textAlign: 'inherit',
      },
      '.leading-unset': {
        lineHeight: 'inherit',
      },
      '.tracking-unset': {
        letterSpacing: 'inherit',
      },
      '.text-color-unset': {
        color: 'inherit',
      },
      '.text-transform-unset': {
        textTransform: 'inherit',
      },
    } : {};

    const fontVariantCapsUtilities = _.fromPairs(
      _.map(theme('fontVariantCaps'), (value, modifier) => {
        return [
          `.${e(`caps-${modifier}`)}`,
          {
            fontVariantCaps: value,
          },
        ];
      })
    );

    const fontVariantNumericUtilities = _.fromPairs(
      _.map(theme('fontVariantNumeric'), (value, modifier) => {
        return [
          `.${e(`nums-${modifier}`)}`,
          {
            fontVariantNumeric: value,
          },
        ];
      })
    );

    const fontVariantLigaturesUtilities = _.fromPairs(
      _.map(theme('fontVariantLigatures'), (value, modifier) => {
        return [
          `.${e(`ligatures-${modifier}`)}`,
          {
            fontVariantLigatures: value,
          },
        ];
      })
    );

    const textRenderingUtilities = _.fromPairs(
      _.map(theme('textRendering'), (value, modifier) => {
        return [
          `.${e(`text-${modifier}`)}`,
          {
            textRendering: value,
          },
        ];
      })
    );

    const textStylesTheme = theme('textStyles');

    const resolveTextStyle = function(name, styles, topLevel = false) {
      if (_.isPlainObject(styles)) {
        const resolvedStyles = _.reduce(styles, function(result, value, key) {
          if (key === 'extends') {
            _.forEach(_.castArray(value), function(textStyleToExtend) {
              _.forEach(resolveTextStyle(textStyleToExtend, textStylesTheme[textStyleToExtend], true), function(extendedValue, extendedKey) {
                if (extendedKey === 'output') {
                  return; // continue
                }
                result = {
                  ...result,
                  ...resolveTextStyle(extendedKey, extendedValue),
                };
              });
            });
            return result;
          }
          return {
            ...result,
            ...resolveTextStyle(key, value),
          };
        }, {});

        if (topLevel) {
          return resolvedStyles;
        }

        return {
          [name]: resolvedStyles,
        };
      }

      if (_.isArray(styles)) {
        if (name === 'fontSize' && styles.length === 2) {
          return {
            fontSize: styles[0],
            lineHeight: styles[1],
          };
        }
        return {
          [name]: styles.join(', '),
        };
      }

      return {
        [name]: styles,
      };
    };

    const textStyles = _.fromPairs(
      _.map(textStylesTheme, (componentStyles, componentName) => {
        componentStyles = resolveTextStyle(componentName, componentStyles, true);
        if (componentStyles.output === false) {
          return [];
        }
        return [
          `.${e(`${options.componentPrefix}${camelCaseToKebabCase(componentName)}`)}`,
          componentStyles,
        ];
      })
    );

    addUtilities(textIndentUtilities, variants('textIndent'));
    addUtilities(textShadowUtilities, variants('textShadow'));
    addUtilities(textDecorationStyleUtilities, variants('textDecorationStyle'));
    addUtilities(textDecorationColorUtilities, variants('textDecorationColor'));
    addUtilities(ellipsisUtilities, variants('ellipsis'));
    addUtilities(hyphensUtilities, variants('hyphens'));
    addUtilities(kerningUtilities, variants('kerning'));
    addUtilities(textUnsetUtilities, variants('textUnset'));
    addUtilities(fontVariantCapsUtilities, variants('fontVariantCaps'));
    addUtilities(fontVariantNumericUtilities, variants('fontVariantNumeric'));
    addUtilities(fontVariantLigaturesUtilities, variants('fontVariantLigatures'));
    addUtilities(textRenderingUtilities, variants('textRendering'));
    addComponents(textStyles);
  };
}, function() {
  return {
    theme: {
      textIndent: {},
      textShadow: {},
      textDecorationStyle: {
        'solid': 'solid',
        'double': 'double',
        'dotted': 'dotted',
        'dashed': 'dashed',
        'wavy': 'wavy',
      },
      textDecorationColor: theme => theme('colors'),
      fontVariantCaps: {
        'normal': 'normal',
        'small': 'small-caps',
        'all-small': 'all-small-caps',
        'petite': 'petite-caps',
        'unicase': 'unicase',
        'titling': 'titling-caps',
      },
      fontVariantNumeric: {
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
      fontVariantLigatures: {
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
      textRendering: {
        'rendering-auto': 'auto',
        'optimize-legibility': 'optimizeLegibility',
        'optimize-speed': 'optimizeSpeed',
        'geometric-precision': 'geometricPrecision'
      },
      textStyles: {},
    },
    variants: {
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
  };
});
