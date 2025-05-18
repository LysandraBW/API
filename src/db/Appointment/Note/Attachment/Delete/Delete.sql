USE WALTRONICS;
GO

DROP PROCEDURE Appointment.DeleteNoteAttachment;
GO

CREATE PROCEDURE Appointment.DeleteNoteAttachment (
	@SessionID		CHAR(36),
	@NoteID			INT,
	@AttachmentID	INT
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

	DECLARE @NoteOwnerID UNIQUEIDENTIFIER;
	SELECT	@NoteOwnerID = EmployeeID
	FROM	Appointment.Note
	WHERE	NoteID = @NoteID;

	IF (@NoteOwnerID <> @SessionEmployeeID)
	BEGIN
		;THROW 50000, 'MUST BE NOTE OWNER', 1;
	END;

	DELETE FROM	Appointment.NoteAttachment
	WHERE		NoteID			= @NoteID AND
				AttachmentID	= @AttachmentID;

	COMMIT TRANSACTION;
END;
GO