USE WALTRONICS;
GO

DROP TABLE Appointment.Deleted;

CREATE TABLE Appointment.Deleted (
	AppointmentID UNIQUEIDENTIFIER NOT NULL,
	PRIMARY KEY (AppointmentID),
	FOREIGN KEY (AppointmentID) REFERENCES Appointment.ID (AppointmentID) ON DELETE CASCADE
);
