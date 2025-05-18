USE WALTRONICS;
GO

DROP PROCEDURE Appointment.GetNoteSharees;
GO

CREATE PROCEDURE Appointment.GetNoteSharees (
	@SessionID	CHAR(36),
	@NoteID		INT
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

	SELECT		Employee.Employee.FName	AS ShareeFName,
				Employee.Employee.LName	AS ShareeLName,
				Employee.Employee.EmployeeID AS ShareeID
	FROM		Appointment.SharedNote
	JOIN		Employee.Employee ON Appointment.SharedNote.EmployeeID = Employee.Employee.EmployeeID
	JOIN		Appointment.Note ON Appointment.Note.NoteID = Appointment.SharedNote.NoteID
	WHERE		Appointment.Note.NoteID	= @NoteID AND
				Appointment.Note.EmployeeID = @SessionEmployeeID
	ORDER BY	ShareeFName ASC,
				ShareeLName ASC;

	COMMIT TRANSACTION;
END;
GO