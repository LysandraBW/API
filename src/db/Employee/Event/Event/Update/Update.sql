USE WALTRONICS;
GO

DROP PROCEDURE Employee.UpdateEvent;
GO

CREATE PROCEDURE Employee.UpdateEvent (
	@SessionID		CHAR(36),
	@EventID		INT,
	@Name			VARCHAR(100)	= NULL,
	@Date			VARCHAR(16)		= NULL,
	@Summary		VARCHAR(500)	= NULL
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

	IF (@Name IS NOT NULL)
	BEGIN
		UPDATE	Employee.Event
		SET		Name = @Name
		WHERE	EventID = @EventID AND
				EmployeeID = @EventOwnerID;
	END;

	IF (@Date IS NOT NULL)
	BEGIN
		DECLARE @_Date DATETIME2 = CONVERT(DATETIME2, CONCAT(@Date, ':00'));

		UPDATE	Employee.Event
		SET		Date = @_Date
		WHERE	EventID = @EventID AND
				EmployeeID = @EventOwnerID;
	END;

	IF (@Summary IS NOT NULL)
	BEGIN
		UPDATE	Employee.Event
		SET		Summary = @Summary
		WHERE	EventID = @EventID AND
				EmployeeID = @EventOwnerID;
	END;

	COMMIT TRANSACTION;
END;
GO