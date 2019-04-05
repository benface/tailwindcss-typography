const _ = require('lodash');

module.exports = function() {
  return ({ config, e, addUtilities }) => {
    const defaultEllipsisVariants = ['responsive'];
    const defaultHyphensVariants = ['responsive'];
    const defaultTextIndentVariants = ['responsive'];
    const defaultTextShadowVariants = ['responsive'];

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

    const textIndentUtilities = _.fromPairs(
      _.map(config('theme.textIndent'), (value, modifier) => {
        return [
          `.${e(`indent-${modifier}`)}`,
          {
            textIndent: value,
          },
        ];
      })
    );

    const textShadowUtilities = _.fromPairs(
      _.map(config('theme.textShadow'), (value, modifier) => {
        return [
          `.${e(`text-shadow${modifier === 'default' ? '' : `-${modifier}`}`)}`,
          {
            textShadow: value,
          },
        ];
      })
    );

    addUtilities(ellipsisUtilities, config('variants.ellipsis', defaultEllipsisVariants));
    addUtilities(hyphensUtilities, config('variants.hyphens', defaultHyphensVariants));
    addUtilities(textIndentUtilities, config('variants.textIndent', defaultTextIndentVariants));
    addUtilities(textShadowUtilities, config('variants.textShadow', defaultTextShadowVariants));
  };
};
