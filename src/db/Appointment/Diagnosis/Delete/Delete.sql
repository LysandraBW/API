USE WALTRONICS;
GO

DROP PROCEDURE Appointment.DeleteDiagnosis;
GO

CREATE PROCEDURE Appointment.DeleteDiagnosis (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@DiagnosisID	INT
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

	DECLARE @Diagnosis VARCHAR(500) = (
		SELECT	Message 
		FROM	Appointment.Diagnosis 
		WHERE	AppointmentID = @AppointmentID AND 
				DiagnosisID = @DiagnosisID
	);

	DELETE FROM Appointment.Diagnosis
	WHERE		AppointmentID	= @AppointmentID AND
				DiagnosisID		= @DiagnosisID;
	
	DECLARE @S1 VARCHAR(300) =	CASE WHEN LEN(@Diagnosis) > 300 THEN SUBSTRING(@Diagnosis, 1, 300) + '...' 
								ELSE @Diagnosis END;

	DECLARE @M1 VARCHAR(400) = 'Deleted Diagnosis ''' + @S1 + '''';
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M1;

	COMMIT TRANSACTION;
END;
GO
