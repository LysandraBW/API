USE WALTRONICS;
GO

-- DROP PROCEDURE Session.AuthorizeAppointmentAccess;
-- GO

ALTER PROCEDURE Session.AuthorizeAppointmentAccess (
	@SessionID		UNIQUEIDENTIFIER,
	@AppointmentID	UNIQUEIDENTIFIER
)
AS
BEGIN
	IF (USER_NAME() = 'User_Appointment_Holder')
	BEGIN
		DECLARE @SessionAppointmentID UNIQUEIDENTIFIER;
		EXEC Session.Authenticate
			'Appointment',
			@SessionID,
			@SessionAppointmentID OUTPUT;

		IF (@SessionAppointmentID <> @AppointmentID)
		BEGIN
			;THROW 50000, 'UNAUTHORIZED ACCESS', 1;
		END;
	END
	ELSE IF (USER_NAME() = 'User_Employee')
	BEGIN
		DECLARE @SessionEmployeeID UNIQUEIDENTIFIER;
		EXEC Session.Authenticate
			'Employee',
			@SessionID,
			@SessionEmployeeID OUTPUT;

		IF (@SessionEmployeeID IS NULL)
		BEGIN
			;THROW 50000, 'UNAUTHORIZED ACCESS', 1;
		END;
	END;
	ELSE
	BEGIN
		;THROW 50000, 'UNAUTHORIZED ACCESS', 1;
	END;
END;
GO