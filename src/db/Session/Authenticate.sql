USE WALTRONICS;
GO

-- DROP PROCEDURE Session.Authenticate;
-- GO

ALTER PROCEDURE Session.Authenticate (
	@Role		VARCHAR(50),
	@SessionID	UNIQUEIDENTIFIER,
	@ID			UNIQUEIDENTIFIER OUTPUT
)
AS
BEGIN
	IF ((@Role != 'Appointment' AND @Role != 'Employee') OR @SessionID IS NULL)
	BEGIN
		;THROW 50000, 'INVALID ROLE', 1;
	END;
	
	IF (@Role = 'Appointment')
	BEGIN
		DECLARE @AppointmentID UNIQUEIDENTIFIER = (
			SELECT	ID
			FROM	Session.Session
			WHERE	SessionID = @SessionID AND
					Role = 'Appointment'
		);

		IF (@AppointmentID IS NULL)
		BEGIN
			;THROW 50000, 'UNAUTHENTICATED SESSION 1', 1;
		END;

		SELECT @ID = @AppointmentID;
	END;

	IF (@Role = 'Employee')
	BEGIN
		DECLARE @EmployeeID UNIQUEIDENTIFIER = (
			SELECT	ID
			FROM	Session.Session
			WHERE	SessionID = @SessionID AND		
					Role = 'EMPLOYEE'
		);

		IF (@EmployeeID IS NULL)
		BEGIN
			;THROW 50000, 'UNAUTHENTICATED SESSION 2', 1;
		END;

		SELECT @ID = @EmployeeID;
	END;
END;
GO

SELECT * FROM Session.Session;