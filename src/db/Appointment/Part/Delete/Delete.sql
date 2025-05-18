USE WALTRONICS;
GO

DROP PROCEDURE Appointment.DeletePart;
GO

CREATE PROCEDURE Appointment.DeletePart (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@PartID			INT
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

	DECLARE @PartName VARCHAR(50) = (
		SELECT	PartName 
		FROM	Appointment.Part 
		WHERE	PartID = @PartID
	);

	DELETE FROM Appointment.Part
	WHERE		PartID			= @PartID AND
				AppointmentID	= @AppointmentID;

	
	DECLARE @M1 VARCHAR(400) = 'Deleted Part ' + @PartName;
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M1;

	COMMIT TRANSACTION;
END;
GO
