USE WALTRONICS;
GO

DROP PROCEDURE Employee.InsertEventSharee;
GO

CREATE PROCEDURE Employee.InsertEventSharee (
	@SessionID		CHAR(36),
	@EventID		INT,
	@EventShareeID	UNIQUEIDENTIFIER
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

	DECLARE @EventOwnerID UNIQUEIDENTIFIER;
	SELECT	@EventOwnerID = EmployeeID
	FROM	Employee.Event
	WHERE	EventID = @EventID;

	IF (@EventOwnerID <> @SessionEmployeeID)
	BEGIN
		;THROW 50000, 'UNAUTHORIZED USER', 1;
	END;

	IF (@EventOwnerID = @EventShareeID)
	BEGIN
		;THROW 50000, 'CANNOT ADD YOURSELF', 1;
	END;

	INSERT INTO Employee.SharedEvent (EventID, EmployeeID)
	VALUES (
		@EventID,
		@EventShareeID
	);

	COMMIT TRANSACTION;
END;
GO