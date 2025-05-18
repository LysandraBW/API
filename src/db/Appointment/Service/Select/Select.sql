USE WALTRONICS;
GO

-- DROP PROCEDURE Appointment.GetServices;
-- GO

ALTER PROCEDURE Appointment.GetServices (
	@SessionID		UNIQUEIDENTIFIER,
	@AppointmentID	UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	EXEC	Session.AuthorizeAppointmentAccess 
			@SessionID, 
			@AppointmentID;

	SELECT		AppService.Class,
				AppService.Division,
				AppService.Service,
				AppService.AppointmentID,
				AppService.ServiceID AS AppointmentServiceID,
				InfoService.ServiceID AS ServiceID
	FROM		Appointment.Service AppService
	LEFT JOIN	Info.Service InfoService		
	ON			AppService.Service = InfoService.Service
	WHERE		AppointmentID = @AppointmentID
	ORDER BY	Class					ASC,
				Division				ASC,
				InfoService.Service		ASC;

	COMMIT TRANSACTION;
END;
GO