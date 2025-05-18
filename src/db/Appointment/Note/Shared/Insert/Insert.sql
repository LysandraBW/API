USE WALTRONICS;
GO

DROP PROCEDURE Appointment.InsertNoteSharee;
GO

CREATE PROCEDURE Appointment.InsertNoteSharee (
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

	DECLARE @NoteOwnerID UNIQUEIDENTIFIER;
	SELECT	@NoteOwnerID = EmployeeID
	FROM	Appointment.Note
	WHERE	NoteID = @NoteID;

	IF (@NoteOwnerID <> @SessionEmployeeID)
	BEGIN
		;THROW 50000, 'NOT AN OWNER', 1;
	END;

	IF (@NoteOwnerID = @NoteShareeID)
	BEGIN
		;THROW 50000, 'SHAREE CANNOT BE THE OWNER', 1;
	END;

	INSERT INTO Appointment.SharedNote VALUES (
		@NoteID,
		@NoteShareeID
	);

	COMMIT TRANSACTION;
END
GO