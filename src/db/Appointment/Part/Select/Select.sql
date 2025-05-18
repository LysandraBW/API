USE WALTRONICS;
GO

-- DROP PROCEDURE Appointment.GetParts;
-- GO

ALTER PROCEDURE Appointment.GetParts (
	@SessionID		UNIQUEIDENTIFIER,
	@AppointmentID	UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	EXEC	Session.AuthorizeAppointmentAccess
			@SessionID,
			@AppointmentID;

	SELECT		PartID, 
				PartName, 
				PartNumber, 
				Quantity, 
				UnitCost
	FROM		Appointment.Part
	WHERE		AppointmentID = @AppointmentID
	ORDER BY	PartID ASC;

	COMMIT TRANSACTION;
END;
GO