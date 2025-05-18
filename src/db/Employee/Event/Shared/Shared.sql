USE WALTRONICS;
GO

DROP TABLE Employee.SharedEvent;

CREATE TABLE Employee.SharedEvent (
	EventID		INT	NOT NULL,
	EmployeeID	UNIQUEIDENTIFIER NOT NULL,
	PRIMARY KEY (EventID, EmployeeID),
	FOREIGN KEY (EventID) REFERENCES Employee.Event (EventID) ON DELETE CASCADE,
	FOREIGN KEY (EmployeeID) REFERENCES Employee.Employee (EmployeeID)
);