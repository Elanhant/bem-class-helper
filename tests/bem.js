import test from 'tape';
import createBem, { createReactBem } from '../src/bem';

test('===== BEM general tests =====', assert => {
  assert.equal(typeof createBem, 'function', 'Default export should be a function');
  assert.throws(createBem, /Block name must be a string/, 'Throws if called without the block name');
  assert.throws(createBem.bind(createBem, 2), /Block name must be a string/, 'Throws if the block name is not a string');

  assert.end();
});

test('===== BEM helper structure =====', assert => {
  const bem = createBem('myList');
  assert.equal(typeof bem, 'object', msg('returns an object'));
  assert.equal(typeof bem.block, 'function', msg('has ".block" method'));
  assert.equal(typeof bem.element, 'function', msg('has ".element" method'));

  assert.end();

  function msg(msgText) {
    return `createBem('myList'): ${msgText}`;
  }
});

test('===== BEM methods =====', assert => {
  const bem = createBem('myList', ['dotted', 'priority']);
  assert.equal(bem.block(), 'myList', msg(`".block()" without arguments returns 'myList'`));
  assert.equal(bem.block({ dotted: true, priority: 2 }), 'myList myList--dotted myList--priority-2', msg(`".block()" applies passed modifiers`));
  assert.equal(bem.block({ small: true }), 'myList', msg(`".block()" skips unknown passed modifiers`));

  assert.throws(bem.element, /Element name must be a string/, msg('".element()" without arguments throws'));
  assert.throws(bem.element.bind(bem, 1), /Element name must be a string/, msg('".element()" with non-string argument throws'));
  assert.equal(bem.element('item'), 'myList__item', msg(`".element()" returns correct class`));

  const
    modifiers = { active: true, color: 'green' },
    expected = 'myList__item myList__item--active myList__item--color-green',
    actual = bem.element('item', { active: true, color: 'green' });

  assert.equal(actual, expected, msg(`".element()" applies modifiers`));

  assert.end();

  function msg(msgText) {
    return `createBem('myList'): ${msgText}`;
  }
});
