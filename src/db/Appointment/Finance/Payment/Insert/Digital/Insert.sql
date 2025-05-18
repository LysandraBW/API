USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertDigitalPayment;
GO

CREATE PROCEDURE Appointment.InsertDigitalPayment (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@Payment		MONEY,
	@Name			VARCHAR(100),
	@Type			VARCHAR(10),
	@CCN			VARCHAR(16),
	@EXP			CHAR(4),
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

	EXEC Appointment.InsertPayment @SessionID, @AppointmentID, @Payment, @PaymentID OUTPUT;

	PRINT @PaymentID;
	
	EXEC Appointment.InsertCreditCard @SessionID, @AppointmentID, @PaymentID, @Name, @Type, @CCN, @EXP;

	COMMIT TRANSACTION;
END;
GO