USE WALTRONICS;
GO

DROP TABLE Appointment.Vehicle;

CREATE TABLE Appointment.Vehicle (
	AppointmentID	UNIQUEIDENTIFIER NOT NULL,
	Make			VARCHAR(50) NOT NULL,
	Model			VARCHAR(50) NOT NULL,
	ModelYear		INT			NOT NULL,
	VIN				VARCHAR(17),
	Mileage			INT,
	LicensePlate	VARCHAR(8),
	CHECK (
		VIN IS NULL OR VIN = '' OR (
		VIN	LIKE '[0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z][0-9A-Z]' AND
		VIN	NOT LIKE '%[OIQ]%')
	),
	CHECK (ModelYear > 1980 AND ModelYear < 2030),
	CHECK (LicensePlate NOT LIKE '%[^A-Z0-9]%'),
	PRIMARY KEY (AppointmentID),
	FOREIGN KEY (Make) REFERENCES Info.Make (Make),
	FOREIGN KEY (AppointmentID) REFERENCES Appointment.ID (AppointmentID) ON DELETE CASCADE
);