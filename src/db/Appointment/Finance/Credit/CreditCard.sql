USE WALTRONICS;
GO

DROP TABLE Appointment.CreditCard;

CREATE TABLE Appointment.CreditCard (
	PaymentID	INT				NOT NULL,
	Name		VARCHAR(100)	NOT NULL,
	Type		VARCHAR(10)		NOT NULL,
	CCN			VARCHAR(16)		NOT NULL,
	EXP			CHAR(4)			NOT NULL,
	CHECK (Type	NOT LIKE '%[^A-Za-z]%'),
	-- CCN must be 15-16 characters long, where each character is a digit.
	CHECK (CCN	NOT LIKE '^[0-9]'),
	CHECK (EXP	LIKE '[0-9][0-9][0-9][0-9]'),
	PRIMARY KEY (PaymentID),
	FOREIGN KEY (PaymentID) REFERENCES Appointment.Payment (PaymentID) ON DELETE CASCADE
);