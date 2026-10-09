import test from 'node:test';
import assert from 'node:assert/strict';
import { findOrders } from '../orders.mjs';
test('all rows paginate without duplicating or losing orders', () => {
  const pages = [1,2,3].flatMap(page => findOrders({ page }).items.map(row => row.id));
  assert.equal(pages.length, 12); assert.equal(new Set(pages).size, 12);
});
test('search is case insensitive and trims surrounding whitespace', () => {
  assert.deepEqual(findOrders({ query: '  cAnVaS  ' }).items.map(row => row.id), ['DEMO-1001','DEMO-1004','DEMO-1009']);
});
test('ID search selects the exact matching example', () => assert.equal(findOrders({ query: 'demo-1006' }).items[0].label, 'Ceramic cup'));
test('status and search combine with AND', () => assert.deepEqual(findOrders({ query: 'Canvas', status: 'pending' }).items.map(row => row.id), ['DEMO-1009']));
test('all status preserves search filtering', () => assert.equal(findOrders({ query: 'travel', status: 'all' }).total, 3));
test('empty query retains only selected status', () => assert.equal(findOrders({ query: '  ', status: 'paid' }).total, 4));
test('no results has an empty first page', () => assert.deepEqual(findOrders({ query: '<script>' }), { items: [], total: 0, page: 1, pages: 1, pageSize: 4, status: 'all' }));
test('out of range pages are clamped to a valid boundary', () => {
  assert.equal(findOrders({ page: 999 }).page, 3); assert.equal(findOrders({ page: -1 }).page, 1);
});
test('invalid URL values yield a safe default result', () => {
  assert.equal(findOrders({ page: NaN, pageSize: NaN, status: 'invalid' }).items.length, 4);
});
