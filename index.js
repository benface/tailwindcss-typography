const _ = require('lodash');

const camelCaseToKebabCase = function(string) {
  return string
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();
};

module.exports = function(options = {}) {
  return ({ theme, variants, e, addUtilities, addComponents }) => {
    const defaultOptions = {
      ellipsis: true,
      hyphens: true,
      textUnset: true,
      caps: true,
      nums: true,
      ligatures: true,
      kern: true,
      componentPrefix: 'c-',
    };
    options = _.defaults({}, options, defaultOptions);
    
    const defaultTextIndentTheme = {};
    const defaultTextIndentVariants = ['responsive'];
    const defaultTextShadowTheme = {};
    const defaultTextShadowVariants = ['responsive'];
    const defaultEllipsisVariants = ['responsive'];
    const defaultHyphensVariants = ['responsive'];
    const defaultTextUnsetVariants = ['responsive'];
    const defaultCapsVariants = ['responsive'];
    const defaultNumsVariants = ['responsive'];
    const defaultLigaturesVariants = ['responsive'];
    const defaultKernVariants = ['responsive'];
    const defaultTextStylesTheme = {};

    const textIndentTheme = theme('textIndent', defaultTextIndentTheme);
    const textIndentVariants = variants('textIndent', defaultTextIndentVariants);
    const textShadowTheme = theme('textShadow', defaultTextShadowTheme);
    const textShadowVariants = variants('textShadow', defaultTextShadowVariants);
    const ellipsisVariants = variants('ellipsis', defaultEllipsisVariants);
    const hyphensVariants = variants('hyphens', defaultHyphensVariants);
    const textUnsetVariants = variants('textUnset', defaultTextUnsetVariants);
    const capsVariants = variants('caps', defaultCapsVariants);
    const numsVariants = variants('nums', defaultNumsVariants);
    const ligaturesVariants = variants('ligatures', defaultLigaturesVariants);
    const kernVariants = variants('kern', defaultKernVariants);
    const textStylesTheme = theme('textStyles', defaultTextStylesTheme);

    const textIndentUtilities = _.fromPairs(
      _.map(textIndentTheme, (value, modifier) => {
        return [
          `.${e(`indent-${modifier}`)}`,
          {
            textIndent: value,
          },
        ];
      })
    );

    const textShadowUtilities = _.fromPairs(
      _.map(textShadowTheme, (value, modifier) => {
        return [
          `.${e(`text-shadow${modifier === 'default' ? '' : `-${modifier}`}`)}`,
          {
            textShadow: value,
          },
        ];
      })
    );

    const ellipsisUtilities = {
      '.ellipsis': {
        textOverflow: 'ellipsis',
      },
      '.no-ellipsis': {
        textOverflow: 'clip',
      },
    };

    const hyphensUtilities = {
      '.hyphens-none': {
        hyphens: 'none',
      },
      '.hyphens-manual': {
        hyphens: 'manual',
      },
      '.hyphens-auto': {
        hyphens: 'auto',
      },
    };

    const textUnsetUtilities = {
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
    };

    const capsUtilities = {
      '.normal-caps': {
        fontVariantCaps: 'normal',
      },
      '.small-caps': {
        fontVariantCaps: 'small-caps',
      },
      '.all-small-caps': {
        fontVariantCaps: 'all-small-caps',
      },
      '.petite-caps': {
        fontVariantCaps: 'petite-caps',
      },
      '.unicase': {
        fontVariantCaps: 'unicase',
      },
      '.titling-caps': {
        fontVariantCaps: 'titling-caps',
      },
    };

    const numsUtilities = {
      '.normal-nums': {
        fontVariantNumeric: 'normal',
      },
      '.ordinal-nums': {
        fontVariantNumeric: 'ordinal',
      },
      '.slashed-zeros': {
        fontVariantNumeric: 'slashed-zero',
      },
      '.lining-nums': {
        fontVariantNumeric: 'lining-nums',
      },
      '.oldstyle-nums': {
        fontVariantNumeric: 'oldstyle-nums',
      },
      '.proportional-nums': {
        fontVariantNumeric: 'proportional-nums',
      },
      '.tabular-nums': {
        fontVariantNumeric: 'tabular-nums',
      },
      '.diagonal-fractions': {
        fontVariantNumeric: 'diagonal-fractions',
      },
      '.stacked-fractions': {
        fontVariantNumeric: 'stacked-fractions',
      },
    };

    const ligaturesUtilities = {
      '.normal-ligatures': {
        fontVariantLigatures: 'normal',
      },
      '.no-ligatures': {
        fontVariantLigatures: 'none',
      },
      '.common-ligatures': {
        fontVariantLigatures: 'common-ligatures',
      },
      '.no-common-ligatures': {
        fontVariantLigatures: 'no-common-ligatures',
      },
      '.discretionary-ligatures': {
        fontVariantLigatures: 'discretionary-ligatures',
      },
      '.no-discretionary-ligatures': {
        fontVariantLigatures: 'no-discretionary-ligatures',
      },
      '.historical-ligatures': {
        fontVariantLigatures: 'historical-ligatures',
      },
      '.no-historical-ligatures': {
        fontVariantLigatures: 'no-historical-ligatures',
      },
      '.contextual-ligatures': {
        fontVariantLigatures: 'contextual',
      },
      '.no-contextual-ligatures': {
        fontVariantLigatures: 'no-contextual',
      },
    };

    const kernUtilities = {
      '.kern': {
        fontFeatureSettings: "'kern'",
        fontKerning: 'normal',
      },
    };

    const resolveTextStyle = function(styles) {
      if (!_.isPlainObject(styles)) {
        return _.isArray(styles) ? styles.join(', ') : styles;
      }
      return _.transform(styles, function(result, value, key) {
        if (key === 'extends') {
          _.forEach(_.castArray(value), function(textStyleToExtend) {
            _.forEach(resolveTextStyle(textStylesTheme[textStyleToExtend]), function(extendedValue, extendedKey) {
              if (extendedKey === 'output') {
                return; // continue
              }
              result[extendedKey] = resolveTextStyle(extendedValue);
            });
          });
          return;
        }
        result[key] = resolveTextStyle(value);
      });
    };

    const textStyles = _.fromPairs(
      _.map(textStylesTheme, (componentStyles, componentName) => {
        componentStyles = resolveTextStyle(componentStyles);
        if (componentStyles.output === false) {
          return [];
        }
        return [
          `.${e(`${options.componentPrefix}${camelCaseToKebabCase(componentName)}`)}`,
          componentStyles,
        ];
      })
    );

    addUtilities(textIndentUtilities, textIndentVariants);
    addUtilities(textShadowUtilities, textShadowVariants);
    if (options.ellipsis) {
      addUtilities(ellipsisUtilities, ellipsisVariants);
    }
    if (options.hyphens) {
      addUtilities(hyphensUtilities, hyphensVariants);
    }
    if (options.textUnset) {
      addUtilities(textUnsetUtilities, textUnsetVariants);
    }
    if (options.caps) {
      addUtilities(capsUtilities, capsVariants);
    }
    if (options.nums) {
      addUtilities(numsUtilities, numsVariants);
    }
    if (options.ligatures) {
      addUtilities(ligaturesUtilities, ligaturesVariants);
    }
    if (options.kern) {
      addUtilities(kernUtilities, kernVariants);
    }
    addComponents(textStyles);
  };
};
