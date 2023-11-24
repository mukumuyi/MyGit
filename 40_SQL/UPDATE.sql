UPDATE [MYDB].[MST_FinancialInstitution] SET URL = 'https://www.rakuten-sec.co.jp/'
WHERE Code = '0661'

select * from [MYDB].[MST_FinancialInstitution]
order by Code desc