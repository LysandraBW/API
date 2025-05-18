USE WALTRONICS;
GO

DROP TABLE Employee.Employee;

CREATE TABLE Employee.Employee (
	EmployeeID	UNIQUEIDENTIFIER	NOT NULL	DEFAULT NEWSEQUENTIALID(),
	FName		VARCHAR(50)			NOT NULL,
	LName		VARCHAR(50)			NOT NULL,
	Email		VARCHAR(320)		NOT NULL,
	Phone		VARCHAR(25)			NOT NULL,
	CHECK (FName NOT LIKE '%[^A-Za-z -]%'),
	CHECK (LName NOT LIKE '%[^A-Za-z -]%'),
	CHECK (Email LIKE '%[A-Za-z0-9]@[A-Za-z0-9][A-Za-z0-9]%.[A-Za-z0-9][A-Za-z0-9]%'),
	CHECK (Phone NOT LIKE '%[^0-9-+()]%'),
	PRIMARY KEY (EmployeeID)
);

ALTER TABLE Employee.Employee
ADD CONSTRAINT DK_Employee 
DEFAULT NEWSEQUENTIALID() FOR EmployeeID;

ALTER TABLE Employee.Employee
DROP CONSTRAINT CK__Employee__Email__69D19EED

ALTER TABLE Employee.Employee
ADD CONSTRAINT CK_Email CHECK (Email LIKE '%[A-Za-z0-9]@[A-Za-z0-9][A-Za-z0-9]%.[A-Za-z0-9][A-Za-z0-9]%')
