USE WALTRONICS;
GO

-- DROP PROCEDURE Appointment.GetAll;
-- GO

ALTER PROCEDURE Appointment.GetAll (
	@SessionID					CHAR(36)
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @EmployeeID UNIQUEIDENTIFIER;
	EXEC	Session.Authenticate
			'Employee',
			@SessionID, 
			@EmployeeID OUTPUT;

	DECLARE @Table TABLE (
		AppointmentID UNIQUEIDENTIFIER,
		CustomerID UNIQUEIDENTIFIER,
		FName VARCHAR(50),
		LName VARCHAR(50),
		Email VARCHAR(50),
		Phone VARCHAR(50),
		Cost MONEY,
		CreationDate DATETIME,
		UpdationDate DATETIME,
		StartDate DATETIME,
		EndDate DATETIME,
		Make VARCHAR(50),
		Model VARCHAR(50),
		ModelYear INT,
		VIN VARCHAR(17),
		Mileage INT,
		LicensePlate VARCHAR(10),
		StatusID INT,
		Status VARCHAR(50)
	)

	INSERT INTO @Table
	SELECT		Appointment.ID.AppointmentID,
				Appointment.ID.CustomerID,
				Customer.Customer.FName,
				Customer.Customer.LName,
				Customer.Customer.Email,
				Customer.Customer.Phone,
				Appointment.Cost.Cost,
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
				InfoStatus.Status
	FROM		Appointment.ID
	LEFT JOIN	Customer.Customer							ON	Appointment.ID.CustomerID		= Customer.Customer.CustomerID
	LEFT JOIN	Appointment.Date							ON	Appointment.ID.AppointmentID	= Appointment.Date.AppointmentID
	LEFT JOIN	Appointment.Vehicle							ON	Appointment.ID.AppointmentID	= Appointment.Vehicle.AppointmentID
	LEFT JOIN	Appointment.Status	AS AppointmentStatus	ON	Appointment.ID.AppointmentID	= AppointmentStatus.AppointmentID
	LEFT JOIN	Info.Status			AS InfoStatus			ON	InfoStatus.StatusID				= AppointmentStatus.StatusID
	LEFT JOIN	Appointment.Cost							ON	Appointment.ID.AppointmentID	= Appointment.Cost.AppointmentID

	SELECT * FROM @Table;
	SELECT COUNT(*) AS Count FROM @Table;

	EXEC	Appointment.GetAllLabels
			@SessionID;

	COMMIT TRANSACTION;
END;
GO