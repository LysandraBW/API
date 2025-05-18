USE WALTRONICS;
GO

DROP PROCEDURE Appointment.DeletePayment;
GO

CREATE PROCEDURE Appointment.DeletePayment (
	@SessionID		UNIQUEIDENTIFIER,
	@AppointmentID	UNIQUEIDENTIFIER,
	@PaymentID		INT
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

	DECLARE @PrevPayment INT = (
		SELECT	Payment 
		FROM	Appointment.Payment 
		WHERE	PaymentID = @PaymentID
	);

	DECLARE @CCN CHAR(4);
	IF (EXISTS(SELECT 1 FROM CreditCard WHERE CreditCard.PaymentID = @PaymentID))
	BEGIN
		SET @CCN = (SELECT CCN FROM	CreditCard WHERE CreditCard.PaymentID = @PaymentID);
	END;
	ELSE
	BEGIN
		SET @CCN = 'N/A';
	END;

	DECLARE @Type VARCHAR(10);
	IF (EXISTS (SELECT 1 FROM CreditCard WHERE CreditCard.PaymentID = @PaymentID))
	BEGIN
		SET @Type = (SELECT	Type FROM CreditCard WHERE CreditCard.PaymentID = @PaymentID);
	END;
	ELSE
	BEGIN
		SET @Type = 'N/A';
	END;

	DELETE FROM	Appointment.Payment
	WHERE		PaymentID		= @PaymentID AND
				AppointmentID	= @AppointmentID;

	DECLARE @M1 VARCHAR(400) = CONCAT('Deleted Payment [ID=', @PaymentID, ' , Type=', @Type, ' , CCN=', @CCN,'] of ''', @PrevPayment, '''');
	EXEC	Employee.LogModification 
			@SessionID, 
			@AppointmentID, 
			@M1;

	COMMIT TRANSACTION;
END;
GO