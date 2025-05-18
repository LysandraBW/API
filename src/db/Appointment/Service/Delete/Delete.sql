USE WALTRONICS;
GO

DROP PROCEDURE Appointment.DeleteService;
GO

CREATE PROCEDURE Appointment.DeleteService (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@ServiceID		INT
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

	DECLARE @Service VARCHAR(25) = (
		SELECT	Service 
		FROM	Appointment.Service
		WHERE	ServiceID = @ServiceID
	);

	DELETE FROM	Appointment.Service
	WHERE		AppointmentID	= @AppointmentID AND 
				ServiceID		= @ServiceID;

	DECLARE @M1 VARCHAR(400) = 'Deleted Service ''' + @Service + '''';
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M1;

	COMMIT TRANSACTION;
END
GO