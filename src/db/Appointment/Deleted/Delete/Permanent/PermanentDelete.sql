USE WALTRONICS;
GO

DROP PROCEDURE Appointment.PDelete;
GO

CREATE PROCEDURE Appointment.PDelete (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER
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

	IF (@AppointmentID IN (SELECT AppointmentID FROM Appointment.Deleted))
	BEGIN
		DELETE FROM	Appointment.ID
		WHERE		AppointmentID = @AppointmentID;

		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				'Permanently Deleted Appointment';
	END;

	COMMIT TRANSACTION;
END;
GO