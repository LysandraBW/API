USE WALTRONICS;
GO

DROP PROCEDURE Appointment.UpdateCost;
GO

CREATE PROCEDURE Appointment.UpdateCost (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@Cost			DECIMAL(10,2) = NULL
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;
	
	IF (@Cost IS NOT NULL)
	BEGIN
		DECLARE @SessionEmployeeID UNIQUEIDENTIFIER;
		EXEC	Session.Authenticate
				'Employee',
				@SessionID, 
				@SessionEmployeeID OUTPUT;

		UPDATE	Appointment.Cost
		SET		Cost			= @Cost
		WHERE	AppointmentID	= @AppointmentID

		DECLARE @M VARCHAR(400) = 'Updated Cost to ''' + CAST(@Cost AS VARCHAR) + '''';
		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				@M;
	END

	COMMIT TRANSACTION;
END;
GO