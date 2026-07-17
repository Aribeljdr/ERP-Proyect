import { getAll, getById, create, update, remove, query, seedDatabase } from './db';

if (typeof window !== 'undefined') {
  seedDatabase();
}

interface PageParams { page?: number; limit?: number }

function paginate<T>(data: T[], params?: PageParams) {
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const start = (page - 1) * limit;
  return { data: data.slice(start, start + limit), total: data.length, page, limit };
}

export const api = {
  dashboard: {
    get: async () => {
      const [kpis, activities, meetings] = await Promise.all([
        getAll<any>('kpis'),
        getAll<any>('activities'),
        getAll<any>('meetings'),
      ]);
      return { kpis, activities, meetings };
    },
  },
  crm: {
    list: async (params?: { q?: string; status?: string } & PageParams) => {
      let clients = await getAll<any>('clients');
      if (params?.status && params.status !== 'all') clients = clients.filter(c => c.status === params.status);
      if (params?.q) clients = clients.filter(c => c.name.toLowerCase().includes(params.q!.toLowerCase()));
      return paginate(clients, params);
    },
    get: (id: number) => getById<any>('clients', id),
    create: (data: any) => create('clients', data),
    update: (id: number, data: any) => update('clients', id, data),
    delete: (id: number) => remove('clients', id),
  },
  projects: {
    getBoard: async () => getAll<any>('kanbanCards'),
    moveCard: async (id: number, toColumn: string) => {
      const card = await getById<any>('kanbanCards', id);
      if (card) await update('kanbanCards', id, { ...card, columnKey: toColumn });
    },
    createCard: (data: any) => create('kanbanCards', data),
    updateCard: (id: number, data: any) => update('kanbanCards', id, data),
    deleteCard: (id: number) => remove('kanbanCards', id),
  },
  sales: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('salesOrders');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('salesOrders', id),
    create: (data: any) => create('salesOrders', data),
    update: (id: number, data: any) => update('salesOrders', id, data),
    delete: (id: number) => remove('salesOrders', id),
    summary: async () => {
      const items = await getAll<any>('salesOrders');
      return { total: items.reduce((s, i) => s + i.total, 0), count: items.length };
    },
  },
  invoicing: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('invoices');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('invoices', id),
    create: (data: any) => create('invoices', data),
    update: (id: number, data: any) => update('invoices', id, data),
    delete: (id: number) => remove('invoices', id),
    summary: async () => {
      const items = await getAll<any>('invoices');
      return { total: items.reduce((s, i) => s + i.total, 0), count: items.length };
    },
  },
  campaigns: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('campaigns');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('campaigns', id),
    create: (data: any) => create('campaigns', data),
    update: (id: number, data: any) => update('campaigns', id, data),
    delete: (id: number) => remove('campaigns', id),
    summary: async () => {
      const items = await getAll<any>('campaigns');
      return { total: items.length };
    },
  },
  emailTemplates: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('emailTemplates');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('emailTemplates', id),
    create: (data: any) => create('emailTemplates', data),
    update: (id: number, data: any) => update('emailTemplates', id, data),
    delete: (id: number) => remove('emailTemplates', id),
    summary: async () => {
      const items = await getAll<any>('emailTemplates');
      return { total: items.length };
    },
  },
  landingPages: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('landingPages');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('landingPages', id),
    create: (data: any) => create('landingPages', data),
    update: (id: number, data: any) => update('landingPages', id, data),
    delete: (id: number) => remove('landingPages', id),
    summary: async () => {
      const items = await getAll<any>('landingPages');
      return { total: items.length };
    },
  },
  expenses: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('expenses');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('expenses', id),
    create: (data: any) => create('expenses', data),
    update: (id: number, data: any) => update('expenses', id, data),
    delete: (id: number) => remove('expenses', id),
    summary: async () => {
      const items = await getAll<any>('expenses');
      return { total: items.reduce((s, i) => s + i.amount, 0), count: items.length };
    },
  },
  treasury: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('treasuryMovements');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('treasuryMovements', id),
    create: (data: any) => create('treasuryMovements', data),
    update: (id: number, data: any) => update('treasuryMovements', id, data),
    delete: (id: number) => remove('treasuryMovements', id),
    summary: async () => {
      const items = await getAll<any>('treasuryMovements');
      const income = items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0);
      const expense = items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0);
      return { total: items.length, income, expense, balance: income - expense };
    },
  },
  documents: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('documents');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('documents', id),
    create: (data: any) => create('documents', data),
    update: (id: number, data: any) => update('documents', id, data),
    delete: (id: number) => remove('documents', id),
    summary: async () => {
      const items = await getAll<any>('documents');
      return { total: items.length };
    },
  },
  employees: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('employees');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('employees', id),
    create: (data: any) => create('employees', data),
    update: (id: number, data: any) => update('employees', id, data),
    delete: (id: number) => remove('employees', id),
    summary: async () => {
      const items = await getAll<any>('employees');
      return { total: items.length, active: items.filter(i => i.status === 'active').length };
    },
  },
  payroll: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('payrollRecords');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('payrollRecords', id),
    create: (data: any) => create('payrollRecords', data),
    update: (id: number, data: any) => update('payrollRecords', id, data),
    delete: (id: number) => remove('payrollRecords', id),
    summary: async () => {
      const items = await getAll<any>('payrollRecords');
      return { total: items.reduce((s, i) => s + i.netPay, 0), count: items.length };
    },
  },
  attendance: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('attendanceRecords');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('attendanceRecords', id),
    create: (data: any) => create('attendanceRecords', data),
    update: (id: number, data: any) => update('attendanceRecords', id, data),
    delete: (id: number) => remove('attendanceRecords', id),
    summary: async () => {
      const items = await getAll<any>('attendanceRecords');
      const present = items.filter(i => i.status === 'present').length;
      return { total: items.length, present, absent: items.filter(i => i.status === 'absent').length };
    },
  },
  accounting: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('journalEntries');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('journalEntries', id),
    create: (data: any) => create('journalEntries', data),
    update: (id: number, data: any) => update('journalEntries', id, data),
    delete: (id: number) => remove('journalEntries', id),
    summary: async () => {
      const items = await getAll<any>('journalEntries');
      return { total: items.length, debits: items.filter(i => i.entryType === 'debit').reduce((s, i) => s + i.amount, 0) };
    },
  },
  inventory: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('products');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('products', id),
    create: (data: any) => create('products', data),
    update: (id: number, data: any) => update('products', id, data),
    delete: (id: number) => remove('products', id),
    summary: async () => {
      const items = await getAll<any>('products');
      return { total: items.length, lowStock: items.filter(i => i.stock <= i.minStock).length };
    },
  },
  tickets: {
    list: async (params?: PageParams) => {
      let items = await getAll<any>('tickets');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('tickets', id),
    create: (data: any) => create('tickets', data),
    update: (id: number, data: any) => update('tickets', id, data),
    delete: (id: number) => remove('tickets', id),
    summary: async () => {
      const items = await getAll<any>('tickets');
      return { total: items.length, open: items.filter(i => i.status === 'open').length };
    },
  },
  purchases: {
    list: async (params?: PageParams) => {
      const items = await getAll<any>('purchaseOrders');
      return paginate(items, params);
    },
    get: (id: number) => getById<any>('purchaseOrders', id),
    create: (data: any) => create('purchaseOrders', data),
    update: (id: number, data: any) => update('purchaseOrders', id, data),
    delete: (id: number) => remove('purchaseOrders', id),
    summary: async () => {
      const items = await getAll<any>('purchaseOrders');
      return { total: items.reduce((s, i) => s + i.total, 0), count: items.length };
    },
  },
};
