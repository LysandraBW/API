USE WALTRONICS;
GO

DROP PROCEDURE Appointment.TDelete;
GO

CREATE PROCEDURE Appointment.TDelete (
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

	IF (@AppointmentID NOT IN (SELECT AppointmentID FROM Appointment.Deleted))
	BEGIN
		INSERT INTO Appointment.Deleted 
		VALUES (@AppointmentID);

		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				'Temporarily Deleted Appointment';
	END;

	COMMIT TRANSACTION;
END;
GO