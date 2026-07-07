import test from 'node:test';
import assert from 'node:assert/strict';
import { getActiveCodeLine } from './pseudocode.js';

test('returns the active sorting compare line for a compare step', () => {
  const line = getActiveCodeLine('sorting', 'bubble', { codeLineKey: 'compare' });
  assert.equal(line?.text, 'if a[j] > a[j + 1]');
});

test('returns the active tree traversal line for a tree step', () => {
  const line = getActiveCodeLine('trees', 'bst', { traversalType: 'preorder' });
  assert.equal(line?.text, 'visit(node.value)');
});
