import { findOrders } from './orders.mjs';
const $ = id => document.getElementById(id);
const parameters = new URLSearchParams(location.search);
let query = parameters.get('q') ?? '', status = parameters.get('status') ?? 'all', page = Number(parameters.get('page') ?? 1);
const text = (tag, value, className) => { const node = document.createElement(tag); node.textContent = value; if(className) node.className = className; return node; };
function render() {
  const result = findOrders({ query, status, page }); page = result.page; status = result.status;
  $('query').value = query; $('status').value = status;
  const rows = result.items.map(item => {
    const row = text('div', '', 'row'), detail = text('div', '');
    detail.append(text('div', item.label, 'item-title'), text('div', item.id, 'item-id'));
    row.append(detail, text('span', item.status[0].toUpperCase()+item.status.slice(1), 'badge '+item.status), text('span', '$'+item.total.toFixed(2), 'total'));
    return row;
  });
  $('rows').replaceChildren(...(rows.length ? rows : [text('div', 'No matching orders. Try another search or reset the filters.', 'empty')]));
  $('result-count').textContent = `${result.total} ${result.total === 1 ? 'order' : 'orders'} · synthetic demo data`;
  $('page-label').textContent = `${page} / ${result.pages}`;
  $('previous').disabled = page <= 1; $('next').disabled = page >= result.pages;
  const url = new URL(location.href); url.search = '';
  if(query) url.searchParams.set('q', query); if(status !== 'all') url.searchParams.set('status', status); if(page > 1) url.searchParams.set('page', String(page));
  history.replaceState(null, '', url);
}
$('filters').addEventListener('submit', event => { event.preventDefault(); query = $('query').value; status = $('status').value; page = 1; render(); });
$('reset').addEventListener('click', () => { query = ''; status = 'all'; page = 1; render(); });
$('previous').addEventListener('click', () => { page--; render(); }); $('next').addEventListener('click', () => { page++; render(); });
render();
fetch('./build-info.json', { cache: 'no-store' }).then(response => {
  if(!response.ok) throw Error('No build receipt'); return response.json();
}).then(build => {
  if(!/^[a-f0-9]{40}$/.test(build.sourceCommit)) throw Error('Invalid build identity');
  $('build-status').textContent = 'SOURCE '+build.sourceCommit.slice(0, 12);
}).catch(() => { $('build-status').textContent = 'Unpublished local source'; });
