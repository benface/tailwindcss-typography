const _ = require('lodash');

module.exports = function(options = {}) {
  return ({ config, e, addUtilities }) => {
    const defaultOptions = {
      ellipsis: true,
      hyphens: true,
      textUnset: true,
    };
    options = _.merge({}, defaultOptions, options);
    
    const defaultTextIndentTheme = {};
    const defaultTextIndentVariants = ['responsive'];
    const defaultTextShadowTheme = {};
    const defaultTextShadowVariants = ['responsive'];
    const defaultEllipsisVariants = ['responsive'];
    const defaultHyphensVariants = ['responsive'];
    const defaultTextUnsetVariants = ['responsive'];

    const textIndentUtilities = _.fromPairs(
      _.map(config('theme.textIndent', defaultTextIndentTheme), (value, modifier) => {
        return [
          `.${e(`indent-${modifier}`)}`,
          {
            textIndent: value,
          },
        ];
      })
    );

    const textShadowUtilities = _.fromPairs(
      _.map(config('theme.textShadow', defaultTextShadowTheme), (value, modifier) => {
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

    addUtilities(textIndentUtilities, config('variants.textIndent', defaultTextIndentVariants));
    addUtilities(textShadowUtilities, config('variants.textShadow', defaultTextShadowVariants));
    if (options.ellipsis) {
      addUtilities(ellipsisUtilities, config('variants.ellipsis', defaultEllipsisVariants));
    }
    if (options.hyphens) {
      addUtilities(hyphensUtilities, config('variants.hyphens', defaultHyphensVariants));
    }
    if (options.textUnset) {
      addUtilities(textUnsetUtilities, config('variants.textUnset', defaultTextUnsetVariants));
    }
  };
};
