
-- 3êlÇ»ÇÒÇ≈Ç∑ÇØÇ«ÅAç¿ÇÍÇ‹Ç∑Ç©ÅH
-- ê‹ÇËï‘ÇµÇ‡çló∂
CREATE TABLE Seats
 ( seat   INTEGER NOT NULL  PRIMARY KEY,
   line_id CHAR(1) NOT NULL,
   status CHAR(2) NOT NULL
     CHECK (status IN ('ãÛ', 'êË')) ); 

INSERT INTO Seats VALUES (1, 'A', 'êË');
INSERT INTO Seats VALUES (2, 'A', 'êË');
INSERT INTO Seats VALUES (3, 'A', 'ãÛ');
INSERT INTO Seats VALUES (4, 'A', 'ãÛ');
INSERT INTO Seats VALUES (5, 'A', 'ãÛ');
INSERT INTO Seats VALUES (6, 'B', 'êË');
INSERT INTO Seats VALUES (7, 'B', 'êË');
INSERT INTO Seats VALUES (8, 'B', 'ãÛ');
INSERT INTO Seats VALUES (9, 'B', 'ãÛ');
INSERT INTO Seats VALUES (10,'B', 'ãÛ');
INSERT INTO Seats VALUES (11,'C', 'ãÛ');
INSERT INTO Seats VALUES (12,'C', 'ãÛ');
INSERT INTO Seats VALUES (13,'C', 'ãÛ');
INSERT INTO Seats VALUES (14,'C', 'êË');
INSERT INTO Seats VALUES (15,'C', 'ãÛ');



-- SELECT * FROM Seats
SELECT concat(A1.seat,'Å`',B1.seat) as Available_Seats
  FROM Seats A1
  LEFT OUTER JOIN Seats B1
    ON A1.seat = B1.seat - 2 --@member_cnt
   AND A1.line_id = B1.line_id
 WHERE B1.seat is not null
   AND NOT EXISTS	(
					SELECT * 
					  FROM Seats C1
					 WHERE C1.status <> 'ãÛ'
					   AND C1.seat >= A1.seat
					   AND C1.seat <= B1.seat
					)

-- SELECT * FROM Seats

SELECT concat(A1.seat,'Å`',B1.seat) as Available_Seats
  FROM Seats A1
  LEFT OUTER JOIN Seats B1
    ON A1.seat = B1.seat - 2 --@member_cnt
 WHERE B1.seat is not null
   AND NOT EXISTS	(
					SELECT * 
					  FROM Seats C1
					 WHERE C1.status <> 'ãÛ'
					   AND C1.seat >= A1.seat
					   AND C1.seat <= B1.seat
					)



-- SELECT * FROM Seats
SELECT concat(A1.seat,'Å`',B1.seat) as Available_Seats
  FROM Seats A1
  LEFT OUTER JOIN Seats B1
    ON A1.seat = B1.seat - 2 --@member_cnt
 WHERE B1.seat is not null
   AND NOT EXISTS	(
					SELECT * 
					  FROM Seats C1
					 WHERE C1.status <> 'ãÛ'
					   AND C1.seat >= A1.seat
					   AND C1.seat <= B1.seat
					)
;
With A AS(
	SELECT	seat
			,MAX(seat) OVER(ORDER BY seat
						ROWS BETWEEN 2 FOLLOWING AND 2 FOLLOWING) AS NextSeat
			,status FROM Seats
	WHERE status = 'ãÛ'
 )
SELECT concat(seat,'Å`',NextSeat) as Available_Seats
  FROM A
 WHERE NextSeat - seat = 2


