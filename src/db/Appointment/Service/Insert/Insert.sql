USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertService;
GO

CREATE PROCEDURE Appointment.InsertService (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@Service		VARCHAR(50),
	@Division		VARCHAR(50),
	@Class			VARCHAR(50)
) 
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @SessionEmployeeID UNIQUEIDENTIFIER;
	EXEC	Session.Authenticate
			'Employee',
			@SessionID, 
			@SessionEmployeeID OUTPUT;

	INSERT INTO Appointment.Service 
	VALUES (
		@AppointmentID, 
		@Class,
		@Division,
		@Service
	);

	DECLARE @M1 VARCHAR(400) = CONCAT('Inserted Service ''',@Service, '''');
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M1;

	SELECT SCOPE_IDENTITY() AS ServiceID;
	COMMIT TRANSACTION;
END;
GO