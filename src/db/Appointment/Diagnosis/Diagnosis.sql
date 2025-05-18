USE WALTRONICS;
GO

DROP TABLE Appointment.Diagnosis;

CREATE TABLE Appointment.Diagnosis (
	DiagnosisID		INT					NOT NULL IDENTITY (1,1),
	AppointmentID	UNIQUEIDENTIFIER	NOT NULL,
	Code			VARCHAR(100)		NOT NULL,
	Message			VARCHAR(500)		NOT NULL,
	PRIMARY KEY (DiagnosisID),
	FOREIGN KEY (AppointmentID) REFERENCES Appointment.ID (AppointmentID) ON DELETE CASCADE
);
