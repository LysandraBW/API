USE WALTRONICS;
GO

DROP PROCEDURE Appointment.DeleteRepair;
GO

CREATE PROCEDURE Appointment.DeleteRepair (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@RepairID		INT			
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

	DECLARE @Repair VARCHAR(500) = (
		SELECT	Repair 
		FROM	Appointment.Repair 
		WHERE	AppointmentID = @AppointmentID AND 
				RepairID = @RepairID
	);

	DELETE FROM Appointment.Repair
	WHERE		AppointmentID = @AppointmentID AND
				RepairID = @RepairID;

	DECLARE @S1 VARCHAR(300) =	CASE WHEN LEN(@Repair) > 300 THEN SUBSTRING(@Repair, 1, 300) + '...' 
								ELSE @Repair END;

	DECLARE @M1 VARCHAR(400) = 'Deleted Repair ''' + @S1 + '''';
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M1;

	COMMIT TRANSACTION;
END;
GO