
drop table #TEMP;

CREATE TABLE #TEMP(
	[Resource] [varchar](50) ,
	[Object] [varchar](50) ,
	[Status] [varchar](50) ,
	[Start] datetime ,
	[Finish] datetime
) ON [PRIMARY]
GO
--select * from #TEMP

BULK INSERT	#TEMP
FROM 'C:\Data\Input\timeseries1.csv'
WITH (
	FORMAT = 'CSV',FIRSTROW = 2
)

insert into [MYDB].[MYDB].[TRN_LOT_PROCESS]
--drop table [MYDB].[TRN_LOT_PROCESS]

select * 
-- into [MYDB].[MYDB].[TRN_LOT_PROCESS]
from #TEMP


select * from [MYDB].[MYDB].[TRN_LOT_PROCESS]

-- delete from #TEMP 
-- where Name like '%XX%'


insert into [MYDB].[MYDB].[MST_FinancialInstitution]
select *,null,'SEC' from #TEMP
