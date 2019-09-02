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
    const defaultTextStylesTheme = {};

    const textIndentTheme = theme('textIndent', defaultTextIndentTheme);
    const textIndentVariants = variants('textIndent', defaultTextIndentVariants);
    const textShadowTheme = theme('textShadow', defaultTextShadowTheme);
    const textShadowVariants = variants('textShadow', defaultTextShadowVariants);
    const ellipsisVariants = variants('ellipsis', defaultEllipsisVariants);
    const hyphensVariants = variants('hyphens', defaultHyphensVariants);
    const textUnsetVariants = variants('textUnset', defaultTextUnsetVariants);
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
    addComponents(textStyles);
  };
};
