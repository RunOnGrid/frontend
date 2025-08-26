// Jest setup file
// Configuración global para los tests

// Mock de Buffer para Node.js
global.Buffer = require('buffer').Buffer;

// Mock de crypto para Node.js
global.crypto = require('crypto').webcrypto;

// Configuración de console para tests
console.log = jest.fn();
console.error = jest.fn();
console.warn = jest.fn();
