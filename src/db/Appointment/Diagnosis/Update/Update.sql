USE WALTRONICS;
GO

DROP PROCEDURE Appointment.UpdateDiagnosis;
GO

CREATE PROCEDURE Appointment.UpdateDiagnosis (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@DiagnosisID	INT,
	@Code			VARCHAR(20)		= NULL,
	@Message		VARCHAR(500)	= NULL
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
	
	IF (@Code IS NOT NULL)
	BEGIN
		UPDATE	Appointment.Diagnosis
		SET		Code = @Code
		WHERE	AppointmentID	= @AppointmentID AND
				DiagnosisID		= @DiagnosisID;

		DECLARE @M1 VARCHAR(400) = CONCAT('Updated Diagnosis [ID=', @DiagnosisID, '] Code to ''', @Code, '''');
		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				@M1;
	END;

	IF (@Message IS NOT NULL)
	BEGIN
		UPDATE	Appointment.Diagnosis
		SET		Message = @Message
		WHERE	AppointmentID	= @AppointmentID AND
				DiagnosisID		= @DiagnosisID;

		DECLARE @S1 VARCHAR(300) =	CASE WHEN LEN(@Message) > 300 THEN SUBSTRING(@Message, 1, 300) + '...'
									ELSE @Message END;

		DECLARE @M2 VARCHAR(400) = CONCAT('Updated Diagnosis [ID=', @DiagnosisID, '] Message to ''', @S1, '''');
		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				@M2;
	END;

	COMMIT TRANSACTION;
END;
GO