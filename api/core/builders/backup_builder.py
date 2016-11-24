import xlsxwriter
from string import ascii_uppercase
import api.DAL.data_context.accounts.accounts_select as accounts_select

from datetime import datetime



def build_accounts_breakdown(accounts):

    file_name = datetime.now().strftime('%Y-%m-%d_%H-%M') +".xlsx"
    workbook = xlsxwriter.Workbook('api/exports/backups/' +file_name)

    formats = {}

    formats['currency'] = workbook.add_format({'num_format': '$#,##0.00', 'align' : 'center', 'border': 1})
    formats['currency_emphasis'] = workbook.add_format({'bg_color': 'yellow', 'num_format': '$#,##0.00', 'align' : 'center', 'border': 1})
    formats['header'] = workbook.add_format({'align' : 'center', 'bold' : True, 'border': 1, 'bg_color': '#A59AAE'})
    formats['account_number'] = workbook.add_format({'align' : 'center', 'bold' : True, 'border': 1})
    formats['shred_number'] = workbook.add_format({'align' : 'left', 'bold' : False, 'border': 1})
    formats['date'] = workbook.add_format({'num_format': 'm-d-yyyy', 'border': 1})
    formats['border'] = workbook.add_format({'border': 1})
    formats['center'] = workbook.add_format({'align' : 'center','border': 1})
    formats['sub_header'] = workbook.add_format({'align' : 'center', 'border': 1, 'bg_color': '#E4C46E'})
    formats['page_header'] = workbook.add_format({'align' : 'center', 'border': 1, 'bg_color': '#91AC8E'})
    formats['total_row_left'] = workbook.add_format({'left': 1, 'top': 1, 'bottom': 1, 'bg_color': '#AB7777'})
    formats['total_row'] = workbook.add_format({'top': 1, 'bottom': 1, 'bg_color': '#AB7777'})
    formats['total_row_currency'] = workbook.add_format({'num_format': '$#,##0.00', 'align' : 'center', 'right': 1, 'top': 1, 'bottom': 1, 'bg_color': '#AB7777'})

    
    _add_summary_worksheet(workbook, accounts, formats)

    for account in accounts:
        account_details = accounts_select.account_details(account.account_id)
        _add_account_worksheet(workbook, account_details, formats)

        for subaccount in account.sub_accounts:
            account_details = accounts_select.account_details(subaccount.account_id)
            _add_account_worksheet(workbook, account_details, formats)
         
            for shredaccount in subaccount.sub_accounts:
                account_details = accounts_select.account_details(shredaccount.account_id)
                _add_account_worksheet(workbook, account_details, formats)
    



    workbook.close()
    
    return file_name

def _add_summary_worksheet(workbook, accounts, formats):
    worksheet = workbook.add_worksheet("Summary")


    _add_summary_header(worksheet, formats)

    row = 1

    for account in accounts:
        _add_account_row(worksheet, account, row, formats)
        row +=1
        for subaccount in account.sub_accounts:
            _add_account_row(worksheet, subaccount, row, formats, sub = True)
            row +=1
            for shredaccount in subaccount.sub_accounts:
                _add_account_row(worksheet, shredaccount, row, formats, sub = True, shred = True)
                row +=1

    

def _add_summary_header(worksheet, formats, row = 0):

    worksheet.write(row, 0, "Account Code", formats['header'])
    worksheet.write(row, 1, "Sub Account", formats['header'])
    worksheet.write(row, 2, "Description", formats['header'])
    worksheet.write(row, 3, "2017 Budget", formats['header'])
    worksheet.write(row, 4, "Misc Transfer", formats['header'])
    worksheet.write(row, 5, "Total Budget", formats['header'])
    worksheet.write(row, 6, "Expenditures to Date", formats['header'])
    worksheet.write(row, 7, "Remaining Balance", formats['header'])

def _add_account_row(worksheet, account, row, formats, sub = False, shred = False):

    start_row = 1 if sub else 0
    account_format = formats['account_number'] if not shred else formats['shred_number']

    worksheet.write(row, start_row, _format_account_number(account), account_format)
    worksheet.write(row, 2, account.description, formats['border'])
    worksheet.write(row, 3, account.annual_budget, formats['currency'])
    worksheet.write(row, 4, account.transfer, formats['currency'])
    worksheet.write_formula(row, 5, '=D{}+E{}'.format(row+1,row+1), formats['currency'])
    worksheet.write(row, 6, account.expendetures, formats['currency'])
    worksheet.write_formula(row, 7, '=F{}-G{}'.format(row+1,row+1), formats['currency'])


def _add_account_worksheet(workbook, account, formats):
    account_number = _format_account_number(account)
    worksheet = workbook.add_worksheet(account_number)

    worksheet.merge_range('A1:G1', "{}-{}".format(account_number, account.description), formats['page_header'])

    _add_transaction_header(worksheet, 2, formats)

    row = 3
    monthly_total_rows = []
    for i in range(0,13):
        row =_add_transactions_for_month(worksheet, row, account.monthly_summary[str(i)], i, formats)
        monthly_total_rows.append(row)
        row += 1

    expense_row = _add_monthly_expenses(worksheet, monthly_total_rows, formats)

    _add_budget(worksheet, account, expense_row, formats) 


def _add_transaction_header(worksheet, row, formats):

    worksheet.write(row, 0, "Account#", formats['sub_header'])
    worksheet.write(row, 1, "Vendor", formats['sub_header'])
    worksheet.write(row, 2, "Invoice Date", formats['sub_header'])
    worksheet.write(row, 3, "Date Paid", formats['sub_header'])
    worksheet.write(row, 4, "Invoice#", formats['sub_header'])
    worksheet.write(row, 5, "Description", formats['sub_header'])
    worksheet.write(row, 6, "Total Expensed", formats['sub_header'])


def _add_transactions_for_month(worksheet, row, transactions, month_index, formats):

    if month_index < 12:
        worksheet.merge_range('A{}:G{}'.format(row+1, row+1), months(month_index), formats['header'])
    else:
        worksheet.merge_range('A{}:G{}'.format(row+1, row+1), "Pending", formats['header'])

    
    row+=1
    transaction_rows = 0
    min_rows = 30
    sumation_start = row+1
    for transaction in transactions:
        worksheet.write(row, 0, _format_account_number(transaction), formats['border'])
        worksheet.write(row, 1, transaction.vendor_name, formats['border'])
        worksheet.write(row, 2, transaction.invoice_date, formats['date'])
        worksheet.write(row, 3, transaction.date_paid, formats['date'])
        worksheet.write(row, 4, transaction.invoice_no, formats['border'])
        worksheet.write(row, 5, transaction.description, formats['border'])
        worksheet.write(row, 6, transaction.expense, formats['currency'])
        row+=1
        transaction_rows +=1


    #If transaction rows is less then minimum number of rows needed
    #Loop thtough all rows and give them borders
    end_transactions =  min_rows - transaction_rows + row
    for i in range(row, end_transactions):
        for j in range(0, 7):
            worksheet.write(row, j, "", formats['border'])
        row +=1


    if month_index < 12:
        worksheet.write(row, 0, "{} Total".format(months(month_index)), formats['total_row_left'])
    else:
        worksheet.write(row, 0, "Pending Total", formats['total_row_left'])
    #Fill empty cells
    for i in range(1,6):
        worksheet.write(row, i, "", formats['total_row'])
    worksheet.write_formula(row, 6, "=SUM(G{}:G{})".format(sumation_start, row), formats['total_row_currency'])

    return row


def _add_monthly_expenses(worksheet, monthly_total_rows, formats):

    row = 6
    start_column = 8

    worksheet.merge_range('I{}:J{}'.format(row+1,row+1), "Monthly Totals", formats['header'])
    row +=1

    worksheet.write(row, start_column, "Month", formats['center'] )
    worksheet.write(row, start_column + 1, "Actual", formats['center'] )

    row +=1
    summation_start = row
    for i in range(0, 12):
        worksheet.write(row, start_column, months(i, abrv = True), formats['border'])
        worksheet.write(row, start_column + 1, '=$G${}'.format(monthly_total_rows[i] + 1), formats['currency'])
        row += 1

    worksheet.write(row, start_column, "Pend", formats['border'])
    worksheet.write(row, start_column + 1, '=$G${}'.format(monthly_total_rows[12] + 1), formats['currency'])

    row += 1

    worksheet.write(row, start_column, "Total", formats['border'])
    worksheet.write(row, start_column + 1, '=SUM(J{}:J{})'.format(summation_start+1, row), formats['currency_emphasis'])

    return row


def _add_budget(worksheet, account, expense_row, formats):

    row = 0
    start_row = row
    start_column = 8

    worksheet.write(row, start_column, "Budget", formats['border'] )
    worksheet.write(row, start_column + 1, account.total_budget, formats['currency'])

    row +=1

    worksheet.write(row, start_column, "Expensed", formats['border'] )
    worksheet.write(row, start_column + 1, "=$J${}".format(expense_row+1), formats['currency'])

    row += 1

    worksheet.write(row, start_column, "Remaining Budget", formats['border'] )
    worksheet.write(row, start_column + 1, "=J{}-J{}".format(start_row+1, start_row+2), formats['currency_emphasis'])






def _format_account_number(account):

    if account.shred_no:
        return "{}-{}-{}".format(account.account_no,account.sub_no, account.shred_no)

    elif account.sub_no:
        return "{}-{}".format(account.account_no,account.sub_no)

    else:
        return str(account.account_no)


def months(n, abrv = False):

    m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return a[n] if abrv else m[n] 
