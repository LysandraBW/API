USE WALTRONICS;
GO

DROP PROCEDURE Appointment.GetLabels;
GO

CREATE PROCEDURE Appointment.GetLabels (
	@SessionID		UNIQUEIDENTIFIER,
	@AppointmentID	UNIQUEIDENTIFIER
)
AS
BEGIN
	SET NOCOUNT ON;
	SET XACT_ABORT ON;
	BEGIN TRANSACTION;

	DECLARE @SessionEmployeeID UNIQUEIDENTIFIER;
	EXEC Session.Authenticate
		'Employee',
		@SessionID,
		@SessionEmployeeID OUTPUT;

	SELECT		DISTINCT
				Info.Label.Label,
				Info.Label.LabelID,
				'Value' =
				CASE
					WHEN AppointmentLabel.Value IS NULL THEN 0 
					ELSE AppointmentLabel.Value
				END,
				Appointment.ID.AppointmentID
	FROM		Appointment.ID
	CROSS JOIN	Info.Label
	LEFT JOIN	Appointment.Label AS AppointmentLabel ON AppointmentLabel.AppointmentID = Appointment.ID.AppointmentID AND Info.Label.LabelID = AppointmentLabel.LabelID
	WHERE		Appointment.ID.AppointmentID = @AppointmentID AND
				(AppointmentLabel.EmployeeID = @SessionEmployeeID OR AppointmentLabel.EmployeeID IS NULL);

	COMMIT TRANSACTION;
END;
GO
