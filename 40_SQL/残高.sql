select A.ASSET_CODE,B.NAME,B.[ASSET_Sector],sum(A.AMOUNT) as AMOUNT,sum(A.QUANTITY) as QUANTITY
from [MYDB].[TRN_AssetBalance] A
left outer join [MYDB].[MST_Asset] B
on A.ASSET_CODE = B.CODE
group by A.ASSET_CODE,B.NAME,B.[ASSET_Sector]