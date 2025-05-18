USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertPart;
GO

CREATE PROCEDURE Appointment.InsertPart (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER, 
	@PartName		VARCHAR(50), 
	@PartNumber		VARCHAR(50), 
	@Quantity		INT, 
	@UnitCost		MONEY
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

	INSERT INTO Appointment.Part 
	VALUES (
		@AppointmentID, 
		@PartName, 
		@PartNumber, 
		@Quantity, 
		@UnitCost
	);

	DECLARE @M1 VARCHAR(400) = 'Inserted Part ''' + @PartName + '''';
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M1;

	SELECT SCOPE_IDENTITY() AS PartID;

	COMMIT TRANSACTION;
END;
GO