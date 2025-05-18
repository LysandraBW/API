USE WALTRONICS;
GO

DROP TABLE Appointment.Service;

CREATE TABLE Appointment.Service (
	ServiceID		INT	NOT NULL IDENTITY(1,1),
	AppointmentID	UNIQUEIDENTIFIER NOT NULL,
	Class			VARCHAR(50)	NOT NULL,
	Division		VARCHAR(50)	NOT NULL,
	Service			VARCHAR(50)	NOT NULL,
	CHECK (Class	NOT LIKE '%[^A-Za-z0-9 -/]%'),
	CHECK (Division	NOT LIKE '%[^A-Za-z0-9 -/]%'),
	CHECK (Service	NOT LIKE '%[^A-Za-z0-9 -/]%'),
	PRIMARY KEY (ServiceID),
	FOREIGN KEY (AppointmentID) REFERENCES Appointment.ID (AppointmentID) ON DELETE CASCADE
);

