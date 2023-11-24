--演習問題2-①：ウィンドウ関数の結果予想　その1

CREATE TABLE ServerLoadSample
(server       CHAR(4) NOT NULL,
 sample_date  DATE    NOT NULL,
 load_val      INTEGER NOT NULL,
    PRIMARY KEY (server, sample_date));

INSERT INTO ServerLoadSample VALUES('A' , '2018-02-01',  1024);
INSERT INTO ServerLoadSample VALUES('A' , '2018-02-02',  2366);
INSERT INTO ServerLoadSample VALUES('A' , '2018-02-05',  2366);
INSERT INTO ServerLoadSample VALUES('A' , '2018-02-07',   985);
INSERT INTO ServerLoadSample VALUES('A' , '2018-02-08',   780);
INSERT INTO ServerLoadSample VALUES('A' , '2018-02-12',  1000);
INSERT INTO ServerLoadSample VALUES('B' , '2018-02-01',    54);
INSERT INTO ServerLoadSample VALUES('B' , '2018-02-02', 39008);
INSERT INTO ServerLoadSample VALUES('B' , '2018-02-03',  2900);
INSERT INTO ServerLoadSample VALUES('B' , '2018-02-04',   556);
INSERT INTO ServerLoadSample VALUES('B' , '2018-02-05', 12600);
INSERT INTO ServerLoadSample VALUES('B' , '2018-02-06',  7309);
INSERT INTO ServerLoadSample VALUES('C' , '2018-02-01',  1000);
INSERT INTO ServerLoadSample VALUES('C' , '2018-02-07',  2000);
INSERT INTO ServerLoadSample VALUES('C' , '2018-02-16',   500);


--2
SELECT server, sample_date,
       SUM(load_val) OVER (PARTITION BY server) AS sum_load
  FROM ServerLoadSample;

--1
SELECT server, sample_date,
       SUM(load_val) OVER () AS sum_load
  FROM ServerLoadSample;