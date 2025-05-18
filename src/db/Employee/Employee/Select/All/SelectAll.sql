USE WALTRONICS;
GO

DROP PROCEDURE Employee.GetNames;
GO

CREATE PROCEDURE Employee.GetNames (
	@SessionID	CHAR(36),
	@IncludeMe	BIT
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
			@EmployeeID;


	SELECT	DISTINCT
			Employee.EmployeeID,
			CONCAT(Employee.FName, ' ', Employee.LName) AS Name
	FROM	Employee.Employee
	WHERE	(@IncludeMe = 0 AND Employee.EmployeeID <> @EmployeeID) OR
			(@IncludeMe = 1)

	COMMIT TRANSACTION;
END;
GO