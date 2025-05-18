USE WALTRONICS;
GO

DROP PROCEDURE Employee.DeleteEvent;
GO

CREATE PROCEDURE Employee.DeleteEvent (
	@SessionID	CHAR(36),
	@EventID	INT
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

	DECLARE @EventOwnerID UNIQUEIDENTIFIER = (
		SELECT	EmployeeID
		FROM	Employee.Event
		WHERE	EventID = @EventID
	);

	IF (@EventOwnerID <> @SessionEmployeeID)
	BEGIN
		;THROW 50000, 'UNAUTHORIZED USER', 1;
	END;

	DELETE FROM	Employee.Event
	WHERE		EventID = @EventID AND
				EmployeeID = @EventOwnerID;

	COMMIT TRANSACTION;
END;
GO
