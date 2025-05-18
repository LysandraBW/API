USE WALTRONICS;
GO

DROP PROCEDURE Appointment.UpdateRepair;
GO

CREATE PROCEDURE Appointment.UpdateRepair (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@RepairID		INT,
	@Repair			VARCHAR(500)
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

	UPDATE	Appointment.Repair
	SET		Repair = @Repair
	WHERE	AppointmentID = @AppointmentID AND
			RepairID = @RepairID;

	DECLARE @S1 VARCHAR(300) =	CASE WHEN LEN(@Repair) > 300 THEN SUBSTRING(@Repair, 1, 300) + '...'
								ELSE @Repair END;

	DECLARE @M VARCHAR(400) = CONCAT('Updated Repair [ID=', @RepairID, '] to ''', @Repair, '''');
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M;

	COMMIT TRANSACTION;
END;
GO