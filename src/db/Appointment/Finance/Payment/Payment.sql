USE WALTRONICS;
GO

DROP TABLE Appointment.Payment;

CREATE TABLE Appointment.Payment (
	PaymentID		INT					NOT NULL IDENTITY (1, 1),
	AppointmentID	UNIQUEIDENTIFIER	NOT NULL,
	Payment			MONEY				NOT NULL,
	PaymentDate		DATETIME			NOT NULL,
	CHECK (Payment > 0),
	PRIMARY KEY (PaymentID),
	FOREIGN KEY (AppointmentID) REFERENCES Appointment.ID (AppointmentID) ON DELETE CASCADE
);