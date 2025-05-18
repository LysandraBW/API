USE WALTRONICS;
GO

DROP PROCEDURE Appointment.UpdateNote;
GO

CREATE PROCEDURE Appointment.UpdateNote (
	@SessionID		CHAR(36),
	@AppointmentID	UNIQUEIDENTIFIER,
	@NoteID			INT,
	@Head			VARCHAR(100) = NULL,
	@Body			VARCHAR(500) = NULL,
	@ShowCustomer	BIT		= NULL
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

	DECLARE @NoteOwnerID UNIQUEIDENTIFIER = (
		SELECT	EmployeeID 
		FROM	Appointment.Note 
		WHERE	NoteID = @NoteID
	);

	IF (@NoteOwnerID <> @SessionEmployeeID)
	BEGIN
		;THROW 50000, 'MUST BE NOTE OWNER', 1;
	END;

	IF (@Head IS NOT NULL)
	BEGIN
		UPDATE	Appointment.Note
		SET		Head = @Head
		WHERE	NoteID = @NoteID;
	END;

	IF (@Body IS NOT NULL)
	BEGIN
		UPDATE	Appointment.Note
		SET		Body = @Body
		WHERE	NoteID = @NoteID;
	END;

	IF (@ShowCustomer IS NOT NULL)
	BEGIN
		UPDATE	Appointment.Note
		SET		ShowCustomer = @ShowCustomer
		WHERE	NoteID	= @NoteID;
	END;

	COMMIT TRANSACTION;
END;
GO