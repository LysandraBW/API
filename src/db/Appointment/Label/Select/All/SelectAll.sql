USE WALTRONICS;
GO

-- DROP PROCEDURE Appointment.GetAllLabels;
-- GO

ALTER PROCEDURE Appointment.GetAllLabels (
	@SessionID		UNIQUEIDENTIFIER
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
				Appointment.ID.AppointmentID,
				'Value' =
				CASE
					WHEN AppointmentLabel.Value IS NULL THEN 0 
					ELSE AppointmentLabel.Value
				END
	FROM		Appointment.ID
	CROSS JOIN	Info.Label
	LEFT JOIN	Appointment.Label AS AppointmentLabel ON AppointmentLabel.AppointmentID = Appointment.ID.AppointmentID AND Info.Label.LabelID = AppointmentLabel.LabelID
	WHERE		(AppointmentLabel.EmployeeID = @SessionEmployeeID OR AppointmentLabel.EmployeeID IS NULL)
	ORDER BY Appointment.ID.AppointmentID;

	COMMIT TRANSACTION;
END;
GO