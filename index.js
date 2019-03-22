const _ = require('lodash');

module.exports = ({
  indents = {},
  textShadows = {},
  variants = [],
} = {}) => ({ e, addUtilities }) => {
  addUtilities(
    {
      '.ellipsis': { textOverflow: 'ellipsis' },
      '.hyphens-none': { hyphens: 'none' },
      '.hyphens-manual': { hyphens: 'manual' },
      '.hyphens-auto': { hyphens: 'auto' },
      ...Object.assign(
        {},
        ..._.map(indents, (value, name) => ({
          [`.${e(`indent-${name}`)}`]: { textIndent: value },
        })),
        ..._.map(textShadows, (value, name) => ({
          [`.${e(`text-shadow${name === 'default' ? '' : `-${name}`}`)}`]: { textShadow: value },
        })),
      ),
    },
    variants,
  );
};
