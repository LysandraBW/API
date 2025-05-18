USE WALTRONICS;
GO

--DROP PROCEDURE Employee.LoginEmployee;
--GO

ALTER PROCEDURE Employee.LoginEmployee (
	@Username	VARCHAR(50),
	@Password	VARCHAR(50),
	@SessionID	UNIQUEIDENTIFIER OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE	@EmployeeID UNIQUEIDENTIFIER = (
		SELECT	EmployeeID
		FROM	Employee.Login
		WHERE	Username = @Username AND
				Password = HASHBYTES('SHA2_256', @Password)
	);

	IF (@EmployeeID IS NULL)
	BEGIN
		;THROW 50000, 'EMPLOYEE NOT FOUND', 1;
	END;

	DELETE	FROM Session.Session 
	WHERE	ID = @EmployeeID AND
			Role = 'Employee';
	INSERT INTO Session.Session (ID, Role) VALUES (@EmployeeID, 'Employee');
	
	SELECT @SessionID = (
		SELECT	SessionID
		FROM	Session.Session
		WHERE	ID = @EmployeeID
	)
	COMMIT TRANSACTION;
END;
GO