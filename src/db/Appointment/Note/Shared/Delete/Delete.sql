USE WALTRONICS;
GO

DROP PROCEDURE Appointment.DeleteNoteSharee;
GO

CREATE PROCEDURE Appointment.DeleteNoteSharee (
	@SessionID		CHAR(36),
	@NoteID			INT,
	@NoteShareeID	UNIQUEIDENTIFIER
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

	-- Removing Yourself
	IF (@NoteShareeID = @SessionEmployeeID)
	BEGIN
		DELETE FROM	Appointment.SharedNote
		WHERE		NoteID		= @NoteID AND
					EmployeeID	= @SessionEmployeeID;
	END;
	-- Removing Someone Else
	ELSE
	BEGIN
		DECLARE @NoteOwnerID UNIQUEIDENTIFIER;
		SELECT	@NoteOwnerID = EmployeeID
		FROM	Appointment.Note
		WHERE	NoteID		= @NoteID AND
				EmployeeID	= @SessionEmployeeID;

		IF (@SessionEmployeeID <> @NoteOwnerID)
		BEGIN
			;THROW 50000, 'MUST BE EVENT OWNER', 1;
		END;

		DELETE FROM	Appointment.SharedNote
		WHERE		NoteID		= @NoteID AND
					EmployeeID	= @NoteShareeID;
	END;

	COMMIT TRANSACTION;
END;
GO