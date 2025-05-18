USE WALTRONICS;
GO

DROP TABLE Appointment.Cost;

CREATE TABLE Appointment.Cost (
	AppointmentID	UNIQUEIDENTIFIER NOT NULL,
	Cost			MONEY,
	PRIMARY KEY (AppointmentID),
	FOREIGN KEY (AppointmentID) REFERENCES Appointment.ID (AppointmentID) ON DELETE CASCADE
);