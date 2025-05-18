USE WALTRONICS;
GO

DROP PROCEDURE Employee.InsertEvent;
GO

CREATE PROCEDURE Employee.InsertEvent (
	@SessionID	CHAR(36),
	@Name		VARCHAR(100),
	@Date		VARCHAR(16),
	@Summary	VARCHAR(500)
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

	DECLARE @_Date DATETIME2 = CONVERT(DATETIME2, CONCAT(@Date, ':00'));

	INSERT INTO Employee.Event (EmployeeID, Name, Date, Summary)
	VALUES (
		@SessionEmployeeID,
		@Name,
		@_Date,
		@Summary
	);

	SELECT SCOPE_IDENTITY() AS EventID;

	COMMIT TRANSACTION;
END;
GO