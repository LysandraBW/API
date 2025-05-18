USE WALTRONICS;
GO

DROP PROCEDURE Appointment.TDeleteMultiple;
GO

CREATE PROCEDURE Appointment.TDeleteMultiple (
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
				'Temporarily Deleted Appointment' AS Modification
			FROM STRING_SPLIT(@AppointmentIDs, ',')
		)
		INSERT INTO @Mods
		SELECT * FROM Mods;

		-- "Deleting" the Appointments (Placing Into a Buffer)
		INSERT INTO Appointment.Deleted 
		SELECT AppointmentID FROM @Mods;

		-- Logging the Modifications
		EXEC	Employee.LogModifications
				@SessionID,
				@Mods;
	
	COMMIT TRANSACTION;
END;
GO