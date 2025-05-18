USE WALTRONICS;
GO

DROP TABLE Appointment.Date;

CREATE TABLE Appointment.Date (
	AppointmentID	UNIQUEIDENTIFIER NOT NULL,
	CreationDate	DATETIME NOT NULL,
	UpdationDate	DATETIME NOT NULL,
	StartDate		DATETIME,
	EndDate			DATETIME,
	CHECK (StartDate <= EndDate),
	CHECK (CreationDate <= UpdationDate),
	PRIMARY KEY (AppointmentID),
	FOREIGN KEY (AppointmentID) REFERENCES Appointment.ID (AppointmentID) ON DELETE CASCADE
);
