USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertNoteAttachment;
GO

CREATE PROCEDURE Appointment.InsertNoteAttachment (
	@SessionID	CHAR(36),
	@NoteID		INT,
	@Name		VARCHAR(100),
	@Type		VARCHAR(100),
	@URL		VARCHAR(500)
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


	INSERT INTO Appointment.NoteAttachment (NoteID, Type, Name, URL)
	VALUES (
		@NoteID,
		@Type,
		@Name,
		@URL
	);

	SELECT SCOPE_IDENTITY() AS AttachmentID;

	COMMIT TRANSACTION;
END;
GO