USE WALTRONICS;
GO

DROP PROCEDURE Appointment.GetEmployeeNotes;
GO

CREATE PROCEDURE Appointment.GetEmployeeNotes (
	@SessionID		UNIQUEIDENTIFIER,
	@AppointmentID	UNIQUEIDENTIFIER
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

	SELECT		DISTINCT
				Appointment.Note.*,
				Employee.FName		AS OwnerFName,
				Employee.LName		AS OwnerLName,
				Employee.EmployeeID AS OwnerID
	FROM		Appointment.Note
	JOIN		Employee.Employee ON Appointment.Note.EmployeeID = Employee.Employee.EmployeeID
	WHERE		Appointment.Note.AppointmentID	= @AppointmentID AND
				Appointment.Note.EmployeeID		= @SessionEmployeeID
	UNION
	SELECT		Appointment.Note.*,
				Employee.FName		AS OwnerFName,
				Employee.LName		AS OwnerLName,
				Employee.EmployeeID AS OwnerID
	FROM		Appointment.Note
	JOIN		Appointment.SharedNote ON Appointment.Note.NoteID = Appointment.SharedNote.NoteID
	JOIN		Employee.Employee ON Appointment.Note.EmployeeID = Employee.Employee.EmployeeID
	WHERE		Appointment.SharedNote.EmployeeID = @SessionEmployeeID AND
				Appointment.Note.AppointmentID = @AppointmentID
	ORDER BY	UpdationDate DESC;

	SELECT	DISTINCT
			URL,
			Name,
			Appointment.Note.NoteID,
			Appointment.NoteAttachment.AttachmentID
	FROM	Appointment.NoteAttachment
	JOIN	Appointment.Note
	ON		Appointment.NoteAttachment.NoteID = Appointment.Note.NoteID
	WHERE	Appointment.Note.AppointmentID = @AppointmentID AND
			Appointment.Note.EmployeeID = @SessionEmployeeID
	UNION
	SELECT	URL,
			Name,
			Appointment.Note.NoteID,
			Appointment.NoteAttachment.AttachmentID
	FROM	Appointment.Note
	JOIN	Appointment.SharedNote ON Appointment.Note.NoteID = Appointment.SharedNote.NoteID
	JOIN	Appointment.NoteAttachment ON Appointment.NoteAttachment.NoteID = Appointment.SharedNote.NoteID
	WHERE	Appointment.SharedNote.EmployeeID = @SessionEmployeeID;

	SELECT	Appointment.SharedNote.EmployeeID AS ShareeID,
			Appointment.SharedNote.NoteID
	FROM	Appointment.SharedNote
	JOIN	Appointment.Note
	ON		Appointment.Note.NoteID = Appointment.SharedNote.NoteID
	WHERE	Appointment.Note.AppointmentID = @AppointmentID AND
			Appointment.Note.EmployeeID = @SessionEmployeeID
	
	COMMIT TRANSACTION;
END;
GO