export const global =
  typeof global !== 'undefined'
    ? global
    : typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
    ? window
    : {};

export const process = { env: {} };

export const { Buffer } = require('buffer');
