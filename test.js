const plugin = require('./index.js');

let generatedUtilities = {};

plugin({
  indents: {
    '1': '1px',
    '2': '2px',
  },
  textShadows: {
    'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
    'large': '0 2px 10px rgba(0, 0, 0, 0.5)',
  },
})({
  e: value => value,
  addUtilities: (utilities) => {
    generatedUtilities = utilities;
  },
});

console.log('generatedUtilities', generatedUtilities);
