USE WALTRONICS;
GO

-- DROP PROCEDURE Appointment.GetRepairs;
-- GO

ALTER PROCEDURE Appointment.GetRepairs (
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

	SELECT		RepairID,
				Repair
	FROM		Appointment.Repair
	WHERE		AppointmentID = @AppointmentID
	ORDER BY	RepairID ASC;

	COMMIT TRANSACTION;
END;
GO