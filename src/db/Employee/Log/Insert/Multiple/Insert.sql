USE WALTRONICS;
GO

-- DROP TYPE Modification;
-- CREATE TYPE Modification AS TABLE(AppointmentID UNIQUEIDENTIFIER, Modification VARCHAR(400))

DROP PROCEDURE Employee.LogModifications;
GO

CREATE PROCEDURE Employee.LogModifications (
	@SessionID		CHAR(36),
	@Modification	Modification READONLY
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

	DECLARE @Today DATETIME;
	SET @Today = GETDATE();

	INSERT INTO Employee.Modification 
	SELECT	@SessionEmployeeID AS EmployeeID,
	 		AppointmentID,
	 		Modification,
	 		@Today AS CreationDate
	FROM @Modification;

	COMMIT TRANSACTION;
END;
GO