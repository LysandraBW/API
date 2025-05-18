USE WALTRONICS;
GO

DROP TABLE Appointment.SharedNote;

CREATE TABLE Appointment.SharedNote (
	NoteID		INT	NOT NULL,
	EmployeeID	UNIQUEIDENTIFIER NOT NULL,
	PRIMARY KEY (NoteID, EmployeeID),
	FOREIGN KEY (NoteID) REFERENCES Appointment.Note (NoteID) ON DELETE CASCADE,
	FOREIGN KEY (EmployeeID) REFERENCES Employee.Employee (EmployeeID),
);