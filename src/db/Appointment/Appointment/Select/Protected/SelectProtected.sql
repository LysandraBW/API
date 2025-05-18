USE WALTRONICS;
GO

-- DROP PROCEDURE Appointment.GetProtected;
-- GO

ALTER PROCEDURE Appointment.GetProtected (
	@SessionID		CHAR(36) = NULL,
	@AppointmentID	UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	EXEC Session.AuthorizeAppointmentAccess @SessionID, @AppointmentID;

	SELECT	AppointmentID.AppointmentID,
			AppointmentID.CustomerID,
			Customer.Customer.FName,
			Customer.Customer.LName,
			Customer.Customer.Email,
			Customer.Customer.Phone,
			Appointment.Date.CreationDate,
			Appointment.Date.UpdationDate,
			Appointment.Date.StartDate,
			Appointment.Date.EndDate,
			Appointment.Vehicle.Make,
			Appointment.Vehicle.Model,
			Appointment.Vehicle.ModelYear,
			Appointment.Vehicle.VIN,
			Appointment.Vehicle.Mileage,
			Appointment.Vehicle.LicensePlate,
			AppointmentStatus.StatusID,
			InfoStatus.Status,
			Appointment.Cost.Cost
	FROM	Appointment.ID		AS AppointmentID
	JOIN	Customer.Customer								ON	AppointmentID.CustomerID	= Customer.CustomerID
	JOIN	Appointment.Date								ON	AppointmentID.AppointmentID = Appointment.Date.AppointmentID
	JOIN	Appointment.Vehicle								ON	AppointmentID.AppointmentID = Appointment.Vehicle.AppointmentID
	JOIN	Appointment.Status	AS AppointmentStatus		ON	AppointmentID.AppointmentID	= AppointmentStatus.AppointmentID
	JOIN	Info.Status			AS InfoStatus				ON	InfoStatus.StatusID			= AppointmentStatus.StatusID
	JOIN	Appointment.Cost								ON	AppointmentID.AppointmentID = Appointment.Cost.AppointmentID
	WHERE	AppointmentID.AppointmentID = @AppointmentID;

	EXEC	Appointment.GetServices 
			@SessionID,
			@AppointmentID;

	EXEC	Appointment.GetDiagnoses
			@SessionID,
			@AppointmentID;

	EXEC	Appointment.GetRepairs
			@SessionID,
			@AppointmentID;

	EXEC	Appointment.GetCustomerNotes
			@SessionID,
			@AppointmentID

	COMMIT TRANSACTION;
END;
GO

SELECT * FROM Appointment.ID;