const { RuleTester } = require('eslint');

const rule = require('../../../lib/rules/react-descriptive-effect');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 8,
  },
});

const getError = (type) => ({
  message:
    'Please describe what this effect does either by either using a named function or by adding a comment before it.',
  type,
});

ruleTester.run('react-descriptive-effect', rule, {
  valid: [
    {
      code: `function foo() {
       useEffect(function doTheThing() {})
      }`,
    },
    {
      code: `function foo() {
        // do the thing
        useEffect(() => {})
      }`,
    },
  ],

  invalid: [
    {
      code: `function foo() {
        useEffect(function () {})
      }`,
      errors: [getError('FunctionExpression')],
    },
    {
      code: `function foo() {
        useLayoutEffect(function () {})
      }`,
      errors: [getError('FunctionExpression')],
    },
    {
      code: `function foo() {
        useEffect(() => {});
      }`,
      errors: [getError('ArrowFunctionExpression')],
    },
    {
      code: `function foo() {
        useLayoutEffect(() => {});
      }`,
      errors: [getError('ArrowFunctionExpression')],
    },
    {
      code: `function foo() {
        usePotato(() => {});
        useIceCreamEffect(() => {});
      }`,
      errors: [getError('ArrowFunctionExpression')],
      options: [{
        additionalHooks: '(usePotato|use*Effect)',
      }],
    },
  ],
});
