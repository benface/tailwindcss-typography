const _ = require('lodash');

module.exports = ({
  variants = {},
  indents = {},
  textShadows = {},
} = {}) =>
  ({ e, addUtilities }) => {
    addUtilities(
      {
        '.ellipsis': { textOverflow: 'ellipsis' },
        '.hyphens': { hyphens: 'auto' },
        ...Object.assign(
          {},
          ..._.map(indents, (value, name) => ({
            [`.indent-${e(name)}`]: { textIndent: value },
          })),
          ..._.map(textShadows, (value, name) => ({
            [`.text-shadow${e(name === 'default' ? '' : `-${name}`)}`]: { textShadow: value },
          })),
        ),
      },
      variants,
    );
  };
