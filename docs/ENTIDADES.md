# Entidades de Base de Datos

## Listado Completo (17 entidades)

### users
| Campo    | Tipo     | Notas                |
|----------|----------|----------------------|
| id       | uuid     | PK                   |
| name     | varchar  | —                    |
| email    | varchar  | unique               |
| password | varchar  | bcrypt               |
| role     | varchar  | default 'user'       |

### clients
| Campo    | Tipo     | Notas                |
|----------|----------|----------------------|
| id       | uuid     | PK                   |
| name     | varchar  | —                    |
| company  | varchar  | —                    |
| status   | varchar  | active/lead/pending/inactive |
| value    | decimal  | —                    |
| progress | int      | 0–100                |
| initials | varchar  | avatar               |
| avColor  | varchar  | color avatar         |
| owner    | varchar  | iniciales            |
| ownerName| varchar  | nombre completo      |
| email    | varchar  | nullable             |
| phone    | varchar  | nullable             |

### kpis
| Campo | Tipo    | Notas |
|-------|---------|-------|
| id    | uuid    | PK    |
| label | varchar | —     |
| value | varchar | texto |
| delta | varchar | %     |
| good  | boolean | tendencia positiva |
| down  | boolean | flecha abajo |
| icon  | varchar | —     |
| accent| varchar | color |
| tint  | varchar | fondo |

### activities, meetings
Actividades y reuniones del dashboard. Campos: title/time, description/sub, color, etc.

### kanban_cards
| Campo      | Tipo    | Notas |
|------------|---------|-------|
| id         | uuid    | PK    |
| title      | varchar | —     |
| tag        | varchar | —     |
| priority   | varchar | Alta/Media/Baja |
| assignee   | varchar | iniciales |
| avColor    | varchar | —     |
| comments   | int     | —     |
| due        | varchar | fecha texto |
| progress   | int     | 0–100 |
| columnKey  | varchar | backlog/progress/review/done |
| sortOrder  | int     | —     |

### sales_orders, invoices, purchase_orders
Campos comunes: orderNumber/invoiceNumber, clientName/supplierName, total, status, itemsCount. Invoice incluye issuedAt/dueAt.

### products
| Campo   | Tipo    | Notas |
|---------|---------|-------|
| code    | varchar | —     |
| name    | varchar | —     |
| category| varchar | —     |
| stock   | int     | —     |
| minStock| int     | alerta |
| price   | decimal | —     |

### tickets
| Campo        | Tipo    | Notas |
|--------------|---------|-------|
| title        | varchar | —     |
| clientName   | varchar | —     |
| status       | varchar | open/in_progress/resolved/closed |
| priority     | varchar | alta/media/baja |
| assignedTo   | varchar | —     |
| commentsCount| int     | —     |

### campaigns, email_templates, landing_pages
Módulo Marketing. Campaigns incluye sentCount, openRate, clickRate, budget. EmailTemplates incluye subject, category. LandingPages incluye slug, viewsCount, conversionRate.

### expenses, treasury_movements, journal_entries
Módulo Finanzas. Expenses: description, amount, category, paymentMethod. Treasury: concept, type (income/expense), amount, category. JournalEntries: entryType (debit/credit), account, reference.

### employees, payroll_records, attendance_records
Módulo RRHH. Employees: firstName, lastName, email, position, department, salary, hireDate. Payroll: period, grossSalary, deductions, netPay. Attendance: date, checkIn, checkOut.

### documents
| Campo      | Tipo    | Notas |
|------------|---------|-------|
| name       | varchar | nombre archivo |
| type       | varchar | pdf/xlsx/docx/sql/pbix |
| category   | varchar | —     |
| size       | varchar | ej: "2.4 MB" |
| uploadedBy | varchar | —     |
