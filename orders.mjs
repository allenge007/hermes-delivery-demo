// Synthetic public demo data. No application or company source is reused.
export const orders = Object.freeze([
  { id: 'DEMO-1001', label: 'Canvas tote', status: 'paid', total: 24 },
  { id: 'DEMO-1002', label: 'Desk notebook', status: 'pending', total: 16 },
  { id: 'DEMO-1003', label: 'Travel mug', status: 'shipped', total: 32 },
  { id: 'DEMO-1004', label: 'Canvas pouch', status: 'paid', total: 18 },
  { id: 'DEMO-1005', label: 'Reading light', status: 'pending', total: 42 },
  { id: 'DEMO-1006', label: 'Ceramic cup', status: 'shipped', total: 28 },
  { id: 'DEMO-1007', label: 'Desk tray', status: 'paid', total: 36 },
  { id: 'DEMO-1008', label: 'Travel journal', status: 'shipped', total: 20 },
  { id: 'DEMO-1009', label: 'Canvas cap', status: 'pending', total: 22 },
  { id: 'DEMO-1010', label: 'Paper organizer', status: 'paid', total: 14 },
  { id: 'DEMO-1011', label: 'Desk calendar', status: 'shipped', total: 18 },
  { id: 'DEMO-1012', label: 'Travel tag', status: 'pending', total: 12 },
].map(Object.freeze));

export function findOrders({ query = '', status = 'all', page = 1, pageSize = 4 } = {}) {
  const needle = String(query).trim().toLocaleLowerCase('en-US');
  const selectedStatus = ['pending', 'paid', 'shipped'].includes(status) ? status : 'all';
  const matches = orders.filter(row =>
    (selectedStatus === 'all' || row.status === selectedStatus) &&
    (!needle || `${row.id} ${row.label}`.toLocaleLowerCase('en-US').includes(needle)));
  const size = Number.isFinite(Number(pageSize)) ? Math.min(12, Math.max(1, Math.trunc(Number(pageSize)))) : 4;
  const pages = Math.max(1, Math.ceil(matches.length / size));
  const current = Number.isFinite(Number(page)) ? Math.min(pages, Math.max(1, Math.trunc(Number(page)))) : 1;
  return { items: matches.slice((current - 1) * size, current * size), total: matches.length,
    page: current, pages, pageSize: size, status: selectedStatus };
}
