USE WALTRONICS;
GO

-- DROP PROCEDURE Employee.GetEvents;
-- GO

ALTER PROCEDURE Employee.GetEvents (
	@SessionID CHAR(36)
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

	SELECT	0 AS EventID,
			CAST(@SessionEmployeeID AS UNIQUEIDENTIFIER) AS EmployeeID,
			'Date' = 
			CASE
				WHEN InfoStatus.Status = 'Done' THEN Appointment.Date.EndDate
				ELSE Appointment.Date.StartDate
			END,
			'Summary' =
			CASE
				WHEN InfoStatus.Status = 'Scheduled'	THEN 'Appointment is scheduled for drop-off today.'
				WHEN InfoStatus.Status = 'Evaluation'	THEN 'Appointment is scheduled to be evaluated today.'
				WHEN InfoStatus.Status = 'Done'			THEN 'Appointment is scheduled for pick-up today. Make sure that you''ve received payment before sending off the vehicle.'
			END,
			'Name' = 
			CASE
				WHEN InfoStatus.Status = 'Scheduled'	THEN Customer.FName + ' ' + Customer.LName + ' Scheduled'
				WHEN InfoStatus.Status = 'Evaluation'	THEN Customer.FName + ' ' + Customer.LName + ' Evaluation'
				WHEN InfoStatus.Status = 'Done'			THEN Customer.FName + ' ' + Customer.LName + ' Ready for Pick-Up'
			END,
			CAST(Appointment.ID.AppointmentID AS UNIQUEIDENTIFIER) AS AppointmentID
	FROM	Appointment.Date
	JOIN	Appointment.ID ON Appointment.Date.AppointmentID = Appointment.ID.AppointmentID
	JOIN	Customer.Customer ON Customer.Customer.CustomerID = Appointment.ID.CustomerID
	JOIN	Appointment.Status AS AppointmentStatus ON Appointment.Date.AppointmentID = AppointmentStatus.AppointmentID
	JOIN	Info.Status AS InfoStatus ON AppointmentStatus.StatusID = InfoStatus.StatusID
	WHERE	(StartDate IS NOT NULL OR EndDate IS NOT NULL) AND
			InfoStatus.Status IN ('Scheduled', 'Evaluation', 'Done')
	UNION
	SELECT	Employee.Event.EventID,
			Employee.Event.EmployeeID,
			Employee.Event.Date,
			Employee.Event.Summary,
			Employee.Event.Name,
			CAST(NULL AS UNIQUEIDENTIFIER) AS AppointmentID
	FROM	Employee.Event
	WHERE	Employee.Event.EmployeeID = @SessionEmployeeID
	UNION
	SELECT	Employee.Event.EventID,
			Employee.Event.EmployeeID,
			Employee.Event.Date,
			Employee.Event.Summary,
			Employee.Event.Name,
			CAST(NULL AS UNIQUEIDENTIFIER) AS AppointmentID
	FROM	Employee.Event
	JOIN	Employee.SharedEvent ON Employee.Event.EventID = Employee.SharedEvent.EventID
	WHERE	Employee.SharedEvent.EmployeeID = @SessionEmployeeID;

	SELECT	Employee.SharedEvent.EmployeeID AS ShareeID,
			Employee.SharedEvent.EventID
	FROM	Employee.SharedEvent
	JOIN	Employee.Event
	ON		Employee.Event.EventID = Employee.SharedEvent.EventID
	WHERE	Employee.Event.EmployeeID = @SessionEmployeeID

	COMMIT TRANSACTION;
END;
GO