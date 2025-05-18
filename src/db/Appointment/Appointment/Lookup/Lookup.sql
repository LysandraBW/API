USE WALTRONICS;
GO

DROP PROCEDURE Appointment.Lookup;
GO

CREATE PROCEDURE Appointment.Lookup (
	@AppointmentID	UNIQUEIDENTIFIER,
	@Email			VARCHAR(320),
	@SessionID		CHAR(36) OUTPUT
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @_AppointmentID UNIQUEIDENTIFIER;
	SELECT	@_AppointmentID = AppointmentID
	FROM	Appointment.ID		AS A
	JOIN	Customer.Customer	AS C
	ON		A.CustomerID		= C.CustomerID
	WHERE	C.Email				= @Email AND
			A.AppointmentID		= @AppointmentID;
			
	IF (@_AppointmentID IS NULL)
	BEGIN
		;THROW 50000, 'APPOINTMENT NOT FOUND', 1;
	END;
	
	DELETE FROM Session.Session WHERE ID = @AppointmentID AND Role = 'Appointment';
	INSERT INTO Session.Session (ID, Role) VALUES (@AppointmentID, 'Appointment');
	SELECT @SessionID = (SELECT SessionID FROM Session.Session WHERE ID = @AppointmentID);

	COMMIT TRANSACTION;
END;
GO