USE WALTRONICS;
GO

DROP PROCEDURE Appointment.RecoverMultiple;
GO

CREATE PROCEDURE Appointment.RecoverMultiple (
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
			'Recovered Appointment' AS Modification
		FROM STRING_SPLIT(@AppointmentIDs, ',')
	)
	INSERT INTO @Mods
	SELECT * FROM Mods;

	-- Recovering the Appointments
	DELETE FROM Appointment.Deleted
	WHERE		AppointmentID IN (SELECT AppointmentID FROM @Mods);

	-- Logging the Modifications
	EXEC	Employee.LogModifications
			@SessionID,
			@Mods;

	COMMIT TRANSACTION;
END;
GO
