import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { Client } from './entities/client.entity';
import { Project } from './entities/project.entity';
import { Kpi } from './entities/kpi.entity';
import { Activity } from './entities/activity.entity';
import { Meeting } from './entities/meeting.entity';
import { KanbanCard } from './entities/kanban-card.entity';
import { SalesOrder } from './entities/sales-order.entity';
import { Invoice } from './entities/invoice.entity';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { Product } from './entities/product.entity';
import { Ticket } from './entities/ticket.entity';
import { Campaign } from './entities/campaign.entity';
import { EmailTemplate } from './entities/email-template.entity';
import { LandingPage } from './entities/landing-page.entity';
import { Employee } from './entities/employee.entity';
import { Payroll } from './entities/payroll.entity';
import { AttendanceRecord } from './entities/attendance-record.entity';
import { Expense } from './entities/expense.entity';
import { Treasury } from './entities/treasury.entity';
import { JournalEntry } from './entities/journal-entry.entity';
import { Document } from './entities/document.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'orbit_erp',
  entities: [User, Client, Project, Kpi, Activity, Meeting, KanbanCard, SalesOrder, Invoice, PurchaseOrder, Product, Ticket, Campaign, EmailTemplate, LandingPage, Employee, Payroll, AttendanceRecord, Expense, Treasury, JournalEntry, Document],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
