const _ = require('lodash');

module.exports = function(options = {}) {
  return ({ theme, variants, e, addUtilities }) => {
    const defaultOptions = {
      ellipsis: true,
      hyphens: true,
      textUnset: true,
    };
    options = _.defaults({}, options, defaultOptions);
    
    const defaultTextIndentTheme = {};
    const defaultTextIndentVariants = ['responsive'];
    const defaultTextShadowTheme = {};
    const defaultTextShadowVariants = ['responsive'];
    const defaultEllipsisVariants = ['responsive'];
    const defaultHyphensVariants = ['responsive'];
    const defaultTextUnsetVariants = ['responsive'];

    const textIndentTheme = theme('textIndent', defaultTextIndentTheme);
    const textIndentVariants = variants('textIndent', defaultTextIndentVariants);
    const textShadowTheme = theme('textShadow', defaultTextShadowTheme);
    const textShadowVariants = variants('textShadow', defaultTextShadowVariants);
    const ellipsisVariants = variants('ellipsis', defaultEllipsisVariants);
    const hyphensVariants = variants('hyphens', defaultHyphensVariants);
    const textUnsetVariants = variants('textUnset', defaultTextUnsetVariants);

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
  };
};
