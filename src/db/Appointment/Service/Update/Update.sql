USE WALTRONICS;
GO

DROP PROCEDURE Appointment.UpdateService;
GO

CREATE PROCEDURE Appointment.UpdateService (
	@SessionID		UNIQUEIDENTIFIER,
	@AppointmentID	UNIQUEIDENTIFIER,
	@ServiceID		INT,
	@Service		VARCHAR(50) = NULL,
	@Division		VARCHAR(50) = NULL,
	@Class			VARCHAR(50) = NULL
)
AS
BEGIN
	SET NOCOUNT ON;
	SET	XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @SessionEmployeeID UNIQUEIDENTIFIER;
	EXEC	Session.Authenticate
			'Employee',
			@SessionID, 
			@SessionEmployeeID OUTPUT;

	IF (@Service IS NOT NULL)
	BEGIN
		UPDATE	Appointment.Service
		SET		Service = @Service
		WHERE	ServiceID		= @ServiceID AND
				AppointmentID	= @AppointmentID;

		DECLARE @M1 VARCHAR(400) = CONCAT('Updated Service to ''', @Service, '''');
		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				@M1;
	END;

	IF (@Division IS NOT NULL)
	BEGIN
		UPDATE	Appointment.Service
		SET		Division = @Division
		WHERE	ServiceID		= @ServiceID AND
				AppointmentID	= @AppointmentID;

		DECLARE @M2 VARCHAR(400) = CONCAT('Updated Service Division to ''', @Division, '''');
		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				@M2;
	END;

	IF (@Class IS NOT NULL)
	BEGIN
		UPDATE	Appointment.Service
		SET		Class = @Class
		WHERE	ServiceID		= @ServiceID AND
				AppointmentID	= @AppointmentID;

		DECLARE @M3 VARCHAR(400) = CONCAT('Updated Service Class to ''', @Class, '''');
		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				@M3;
	END;

	COMMIT TRANSACTION;
END;
GO

SELECT * FROM Employee.Modification;

SELECT * FROM Appointment.Service;