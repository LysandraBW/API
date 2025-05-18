USE WALTRONICS;
GO

DROP PROCEDURE Appointment.PDeleteMultiple;
GO

CREATE PROCEDURE Appointment.PDeleteMultiple (
	@SessionID		CHAR(36),
	@AppointmentIDs	VARCHAR(1000)
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

		-- Creating the Table of Modifications
		DECLARE @Mods Modification;
		WITH Mods AS 
		(
			SELECT 
				value AS AppointmentID,
				'Permanently Deleted Appointment' AS Modification
			FROM STRING_SPLIT(@AppointmentIDs, ',')
		)
		INSERT INTO @Mods
		SELECT * FROM Mods;

		-- Deleting the Appointments
		DELETE FROM Appointment.ID
		WHERE	AppointmentID IN (SELECT AppointmentID FROM @Mods) AND
				AppointmentID IN (SELECT AppointmentID FROM Appointment.Deleted);

		-- Logging the Modifications
		EXEC	Employee.LogModifications
				@SessionID,
				@Mods;
	
	COMMIT TRANSACTION;
END;
GO