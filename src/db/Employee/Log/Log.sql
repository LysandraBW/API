USE WALTRONICS;
GO

DROP TABLE Employee.Modification;

CREATE TABLE Employee.Modification (
	ModificationID	INT					NOT NULL	IDENTITY (1,1),
	EmployeeID		UNIQUEIDENTIFIER	NOT NULL,
	AppointmentID	UNIQUEIDENTIFIER	NOT NULL,
	Modification	VARCHAR(400)		NOT NULL,
	CreationDate	DATETIME			NOT NULL
	PRIMARY KEY (ModificationID)
);