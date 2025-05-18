USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertDiagnosis;
GO

CREATE PROCEDURE Appointment.InsertDiagnosis (
	@SessionID		UNIQUEIDENTIFIER,
	@AppointmentID	UNIQUEIDENTIFIER,
	@Code			VARCHAR(20),
	@Message		VARCHAR(500)
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

	INSERT INTO Appointment.Diagnosis 
	VALUES (
		@AppointmentID,
		@Code,
		@Message
	);

	DECLARE @S1 VARCHAR(300) =	CASE WHEN LEN(@Message) > 300 THEN SUBSTRING(@Message, 1, 300) + '...'
								ELSE @Message END;

	DECLARE @M1 VARCHAR(400) = CONCAT('Inserted Diagnosis ', @Code, ' (''', @S1,''')');
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M1;

	SELECT SCOPE_IDENTITY() AS DiagnosisID;

	COMMIT TRANSACTION;
END;
GO
