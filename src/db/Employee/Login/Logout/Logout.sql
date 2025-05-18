USE WALTRONICS;
GO

--DROP PROCEDURE Employee.LogoutEmployee;
--GO

ALTER PROCEDURE Employee.LogoutEmployee (
	@SessionID CHAR(36)
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

	DELETE FROM	Session.Session
	WHERE		SessionID = @SessionID AND
				ID = @SessionEmployeeID;

	COMMIT TRANSACTION;
END;
GO