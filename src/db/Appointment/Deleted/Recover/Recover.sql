USE WALTRONICS;
GO

DROP PROCEDURE Appointment.Recover;
GO

CREATE PROCEDURE Appointment.Recover (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @SessionEmployeeID UNIQUEIDENTIFIER;
	EXEC	Employee.Authenticate
			@SessionID, 
			@SessionEmployeeID OUTPUT;

	DELETE FROM Appointment.Deleted
	WHERE		AppointmentID = @AppointmentID;

	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			'Restored Appointment';

	COMMIT TRANSACTION;
END;
GO
