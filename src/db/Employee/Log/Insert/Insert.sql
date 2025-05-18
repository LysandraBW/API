USE WALTRONICS;
GO

DROP PROCEDURE Employee.LogModification;
GO

CREATE PROCEDURE Employee.LogModification (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@Modification	VARCHAR(400)
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

	INSERT INTO Employee.Modification 
	VALUES (
		@SessionEmployeeID,
		@AppointmentID,
		@Modification,
		GETDATE()
	);

	COMMIT TRANSACTION;
END;
GO