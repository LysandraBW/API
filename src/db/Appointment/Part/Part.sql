USE WALTRONICS;
GO

DROP TABLE Appointment.Part;

CREATE TABLE Appointment.Part (
	PartID			INT					NOT NULL IDENTITY (1,1),
	AppointmentID	UNIQUEIDENTIFIER	NOT NULL,
	PartName		VARCHAR(100)		NOT NULL,
	PartNumber		VARCHAR(100)		NOT NULL,
	Quantity		INT					NOT NULL,
	UnitCost		MONEY				NOT NULL,
	CHECK (Quantity > 0),
	CHECK (UnitCost > 0),
	PRIMARY KEY (PartID),
	FOREIGN KEY (AppointmentID) REFERENCES Appointment.ID (AppointmentID) ON DELETE CASCADE
);