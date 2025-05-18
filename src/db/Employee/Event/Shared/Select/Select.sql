USE WALTRONICS;
GO

DROP PROCEDURE Employee.GetEventSharees;
GO

CREATE PROCEDURE Employee.GetEventSharees (
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

	SELECT		Employee.Employee.FName			AS ShareeFName,
				Employee.Employee.LName			AS ShareeLName,
				Employee.Employee.EmployeeID	AS ShareeID
	FROM		Employee.SharedEvent
	JOIN		Employee.Employee				ON Employee.SharedEvent.EmployeeID = Employee.Employee.EmployeeID
	JOIN		Employee.Event					ON Employee.Event.EventID = Employee.SharedEvent.EventID
	WHERE		Employee.Event.EventID			= @EventID AND
				Employee.Event.EmployeeID		= @SessionEmployeeID
	ORDER BY	ShareeFName ASC,
				ShareeLName ASC;

	COMMIT TRANSACTION;
END;
GO