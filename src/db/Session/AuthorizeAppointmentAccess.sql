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
		;THROW 50000, 'NO LOGIN, UNAUTHORIZED ACCESS', 1;
	END;
END;
GO

EXEC Session.AuthorizeAppointmentAccess '1F3CF464-D7B8-43E6-BE1A-8750F61A8732', 'E970CEA7-8433-F011-A3F1-30F6EF05027A';

