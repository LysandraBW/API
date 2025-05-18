USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertRepair;
GO

CREATE PROCEDURE Appointment.InsertRepair (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@Repair			VARCHAR(500)
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

	INSERT INTO Appointment.Repair
	VALUES (
		@AppointmentID,
		@Repair
	);

	DECLARE @S1 VARCHAR(300) =	CASE WHEN LEN(@Repair) > 300 THEN SUBSTRING(@Repair, 1, 300) + '...'
								ELSE @Repair END;

	DECLARE @M1 VARCHAR(400) = CONCAT('Inserted Repair ''', @S1,'''');
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M1;

	SELECT SCOPE_IDENTITY() AS RepairID;

	COMMIT TRANSACTION;
END;
GO