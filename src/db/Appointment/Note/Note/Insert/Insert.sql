USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertNote;
GO

CREATE PROCEDURE Appointment.InsertNote (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@Head			VARCHAR(100),
	@Body			VARCHAR(500),
	@ShowCustomer	BIT			 = 0
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


	INSERT INTO Appointment.Note 
	VALUES (
		@SessionEmployeeID, 
		@AppointmentID, 
		@Head, 
		@Body, 
		@ShowCustomer,
		GETDATE(), 
		GETDATE()
	);

	SELECT SCOPE_IDENTITY() AS NoteID;

	COMMIT TRANSACTION;
END;
GO