--‰‰K–â‘è1-‡@F•¡”—ñ‚ÌÅ‘å’l

CREATE TABLE Greatests
("key" CHAR(1) PRIMARY KEY,
 x   INTEGER NOT NULL,
 y   INTEGER NOT NULL,
 z   INTEGER NOT NULL);

INSERT INTO Greatests VALUES('A', 1, 2, 3);
INSERT INTO Greatests VALUES('B', 5, 5, 2);
INSERT INTO Greatests VALUES('C', 4, 7, 1);
INSERT INTO Greatests VALUES('D', 3, 3, 8);




--2
SELECT "key"
       ,MAX(CASE WHEN x >= y AND x >= z THEN x 
				 WHEN y >= x AND y >= z THEN y ELSE z END)
  FROM [MYLEARNING].[Greatests]
 GROUP BY "key"

--1
SELECT "key",MAX(CASE WHEN x > y THEN x ELSE y END)
  FROM [MYLEARNING].[Greatests]
 GROUP BY "key"





