USE WALTRONICS;
GO

DROP PROCEDURE Employee.DeleteEventSharee;
GO

CREATE PROCEDURE Employee.DeleteEventSharee (
	@SessionID		CHAR(36),
	@EventID		INT,
	@EventShareeID	UNIQUEIDENTIFIER = NULL
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

	-- Removing Yourself
	IF (@EventShareeID = @SessionEmployeeID)
	BEGIN
			DELETE FROM	Employee.SharedEvent
			WHERE		EventID		= @EventID AND
						EmployeeID	= @SessionEmployeeID;
	END;
	-- Removing Someone
	ELSE
	BEGIN
		DECLARE @EventOwnerID UNIQUEIDENTIFIER
		SELECT	@EventOwnerID = EmployeeID
		FROM	Employee.Event
		WHERE	EventID = @EventID;

		IF (@SessionEmployeeID <> @EventOwnerID)
		BEGIN
			;THROW 50000, 'UNAUTHORIZED USER', 1;
		END;
		
		DELETE FROM	Employee.SharedEvent
		WHERE		EventID		= @EventID AND
					EmployeeID	= @EventShareeID;
	END;

	COMMIT TRANSACTION;
END;
GO
