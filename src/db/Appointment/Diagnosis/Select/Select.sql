USE WALTRONICS;
GO

-- DROP PROCEDURE Appointment.GetDiagnoses;
-- GO

ALTER PROCEDURE Appointment.GetDiagnoses (
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

	SELECT		DiagnosisID,
				Code,
				Message
	FROM		Appointment.Diagnosis
	WHERE		AppointmentID = @AppointmentID
	ORDER BY	DiagnosisID ASC;

	COMMIT TRANSACTION;
END;
GO