USE WALTRONICS;
GO

DROP PROCEDURE Appointment.UpdateStatus;
GO

CREATE PROCEDURE Appointment.UpdateStatus (
	@SessionID		UNIQUEIDENTIFIER,
	@AppointmentID	UNIQUEIDENTIFIER,
	@StatusID		INT = NULL
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

	IF (@StatusID IS NOT NULL)
	BEGIN
		DECLARE @Status VARCHAR(25) = (
			SELECT	Status 
			FROM	Info.Status 
			WHERE	StatusID = @StatusID
		);

		DECLARE @StartDate DATETIME = (
			SELECT	StartDate
			FROM	Appointment.Date
			WHERE	AppointmentID = @AppointmentID
		);

		DECLARE @EndDate DATETIME = (
			SELECT	EndDate
			FROM	Appointment.Date
			WHERE	AppointmentID = @AppointmentID
		);

		IF (@Status IN ('Completed', 'Done'))
		BEGIN
			IF (@EndDate IS NULL)
			BEGIN
				;THROW 50000, 'APPOINTMENT MUST HAVE AN END DATE', 1;
			END;
		END;
		ELSE IF (@Status <> 'Pending')
		BEGIN
			IF (@StartDate IS NULL)
			BEGIN
				;THROW 50000, 'APPOINTMENT MUST HAVE A START DATE', 1;
			END;
		END;

		UPDATE	Appointment.Status
		SET		StatusID		= @StatusID
		WHERE	AppointmentID	= @AppointmentID;

		DECLARE @M1 VARCHAR(400) = 'Updated Status to ''' + @Status + '''';
		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				@M1;
	END

	COMMIT TRANSACTION;
END;