import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { CrmModule } from './modules/crm/crm.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { SalesModule } from './modules/sales/sales.module';
import { InvoicingModule } from './modules/invoicing/invoicing.module';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { EmailTemplatesModule } from './modules/email-templates/email-templates.module';
import { LandingPagesModule } from './modules/landing-pages/landing-pages.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { TreasuryModule } from './modules/treasury/treasury.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { DocumentsModule } from './modules/documents/documents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    CrmModule,
    DashboardModule,
    ProjectsModule,
    SalesModule,
    InvoicingModule,
    PurchasesModule,
    InventoryModule,
    TicketsModule,
    CampaignsModule,
    EmailTemplatesModule,
    LandingPagesModule,
    EmployeesModule,
    PayrollModule,
    AttendanceModule,
    ExpensesModule,
    TreasuryModule,
    AccountingModule,
    DocumentsModule,
  ],
})
export class AppModule {}
