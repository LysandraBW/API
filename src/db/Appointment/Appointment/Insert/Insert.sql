USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertAppointment;
GO

CREATE PROCEDURE Appointment.InsertAppointment (
	@SessionID		CHAR(36) = NULL,
	@FName			VARCHAR(50),
	@LName			VARCHAR(50),
	@Email			VARCHAR(320),
	@Phone			VARCHAR(25),
	@Make			VARCHAR(50),
	@Model			VARCHAR(50),
	@ModelYear		INT,
	@VIN			VARCHAR(17)	= NULL,
	@Services		VARCHAR(1000)
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @TCustomerID TABLE (ID UNIQUEIDENTIFIER);

	INSERT INTO Customer.Customer (
		CustomerID,
		FName,
		LName,
		Email,
		Phone
	)
	OUTPUT inserted.CustomerID INTO @TCustomerID
	VALUES (
		DEFAULT,
		@FName, 
		@LName, 
		@Email, 
		@Phone
	);

	DECLARE @CustomerID UNIQUEIDENTIFIER;
	SELECT	@CustomerID = ID
	FROM	@TCustomerID;
	
	DECLARE @TAppointmentID TABLE (ID UNIQUEIDENTIFIER);

	INSERT INTO Appointment.ID  (
		AppointmentID,
		CustomerID
	)
	OUTPUT inserted.AppointmentID INTO @TAppointmentID
	VALUES (
		DEFAULT,
		@CustomerID
	);

	DECLARE @AppointmentID UNIQUEIDENTIFIER;
	SELECT	@AppointmentID = ID
	FROM	@TAppointmentID;

	INSERT INTO Appointment.Date 
	VALUES (
		@AppointmentID, 
		GETDATE(), 
		GETDATE(),
		NULL,
		NULL
	);

	INSERT INTO Appointment.Vehicle (AppointmentID, Make, Model, ModelYear, VIN, Mileage, LicensePlate)
	VALUES (
		@AppointmentID, 
		@Make, 
		@Model, 
		@ModelYear, 
		@VIN,
		NULL,
		NULL
	);

	INSERT INTO Appointment.Cost 
	VALUES (
		@AppointmentID,
		NULL
	);

	INSERT INTO Appointment.Status
	VALUES (
		@AppointmentID,
		0
	);

	WITH Services AS
	(
		SELECT 
			@AppointmentID AS AppointmentID,
			Info.ServiceClass.Class,
			Info.ServiceDivision.Division, 
			Info.Service.Service
		FROM Info.Service
		INNER JOIN Info.ServiceDivision ON Info.Service.DivisionID = Info.ServiceDivision.DivisionID
		INNER JOIN Info.ServiceClass ON Info.ServiceClass.ClassID = Info.ServiceDivision.ClassID
		WHERE Info.Service.ServiceID IN (SELECT value FROM STRING_SPLIT(@Services, ','))
	)
	INSERT INTO Appointment.Service
	SELECT * FROM Services
	WHERE AppointmentID = @AppointmentID;

	IF (@SessionID IS NOT NULL)
	BEGIN
		DECLARE @SessionEmployeeID UNIQUEIDENTIFIER;
		EXEC	Employee.Authenticate
				@SessionID, 
				@SessionEmployeeID OUTPUT;

		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				'Inserted Appointment';
	END;

	SELECT @AppointmentID AS AppointmentID;
	COMMIT TRANSACTION;
END;
GO