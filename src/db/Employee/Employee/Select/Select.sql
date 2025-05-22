USE WALTRONICS;
GO

--DROP PROCEDURE Employee.Get;
--GO

ALTER PROCEDURE Employee.Get (
	@SessionID	CHAR(36)
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @EmployeeID UNIQUEIDENTIFIER;
	EXEC	Session.Authenticate
			'Employee',
			@SessionID,
			@EmployeeID OUTPUT;

	SELECT	Employee.Employee.EmployeeID,
			Employee.Employee.FName,
			Employee.Employee.LName,
			Employee.Employee.Email,
			Employee.Employee.Phone
	FROM	Employee.Employee
	WHERE	Employee.Employee.EmployeeID = @EmployeeID;

	COMMIT TRANSACTION;
END;
GO