USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertPayment;
GO

CREATE PROCEDURE Appointment.InsertPayment (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@Payment		MONEY,
	@PaymentID		INT OUTPUT
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

	DECLARE @M1 VARCHAR(400) = CONCAT('Inserted Payment ''', CAST(@Payment AS VARCHAR), '''');
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M1;

	INSERT INTO Appointment.Payment VALUES (
		@AppointmentID, 
		@Payment, 
		GETDATE()
	);

	SELECT @PaymentID = SCOPE_IDENTITY();

	COMMIT TRANSACTION;
END;
GO
