USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertCreditCard;
GO

CREATE PROCEDURE Appointment.InsertCreditCard (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@PaymentID		INT,
	@Name			VARCHAR(100),
	@Type			VARCHAR(10),
	@CCN			VARCHAR(16),
	@EXP			CHAR(4)
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
	
	PRINT 'Insert Credit Card';
	PRINT @PaymentID;
	INSERT INTO Appointment.CreditCard (PaymentID, Name, Type, CCN, EXP) VALUES (@PaymentID, @Name, @Type, @CCN, @EXP);

	IF (@SessionEmployeeID IS NOT NULL)
	BEGIN
		DECLARE @M1 VARCHAR(400) = CONCAT('Attached Credit Card [Type=',@Type,' CCN=',@CCN,'] to ', @PaymentID);
		EXEC	Employee.LogModification 
				@SessionID, 
				@AppointmentID, 
				@M1;
	END;

	COMMIT TRANSACTION;
END;
GO

