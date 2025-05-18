USE WALTRONICS;
GO

DROP PROCEDURE Appointment.UpdateLabel;
GO

CREATE PROCEDURE Appointment.UpdateLabel (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@LabelID		INT,
	@LabelValue		BIT = NULL
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

	IF (NOT EXISTS(
			SELECT	* 
			FROM	Appointment.Label 
			WHERE	AppointmentID	= @AppointmentID AND
					EmployeeID		= @SessionEmployeeID AND
					LabelID			= @LabelID
	))
	BEGIN
		INSERT Appointment.Label 
		VALUES (
			@AppointmentID, 
			@SessionEmployeeID,
			@LabelID,
			0
		);
	END;

	IF (@LabelValue IS NULL)
	BEGIN
		UPDATE	Appointment.Label
		SET		Value = ~Value
		WHERE	AppointmentID = @AppointmentID AND
				EmployeeID = @SessionEmployeeID AND
				LabelID = @LabelID;
	END;
	ELSE
	BEGIN
		UPDATE	Appointment.Label
		SET		Value = @LabelValue
		WHERE	AppointmentID = @AppointmentID AND
				EmployeeID = @SessionEmployeeID AND
				LabelID = @LabelID;
	END;
	

	COMMIT TRANSACTION;
END;
GO