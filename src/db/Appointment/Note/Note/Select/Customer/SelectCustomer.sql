USE WALTRONICS;
GO

DROP PROCEDURE Appointment.GetCustomerNotes;
GO

CREATE PROCEDURE Appointment.GetCustomerNotes (
	@SessionID		UNIQUEIDENTIFIER,
	@AppointmentID	UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	EXEC	Session.AuthorizeAppointmentAccess 
			@SessionID, 
			@AppointmentID;

	SELECT		*
	FROM		Appointment.Note
	WHERE		AppointmentID = @AppointmentID AND
				ShowCustomer = 1
	ORDER BY	UpdationDate DESC;

	SELECT		DISTINCT
				URL,
				Name,
				AttachmentID,
				Appointment.Note.NoteID
	FROM		Appointment.NoteAttachment
	JOIN		Appointment.Note
	ON			Appointment.NoteAttachment.NoteID = Appointment.Note.NoteID
	WHERE		Appointment.Note.ShowCustomer = 1

	COMMIT TRANSACTION;
END;
GO