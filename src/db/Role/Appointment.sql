USE WALTRONICS;
GO

-- CREATE ROLE AppointmentHolder;

REVOKE	ALTER,
		DELETE,
		EXECUTE,
		INSERT,
		SELECT,
		UPDATE,
		REFERENCES
TO		AppointmentHolder;

GRANT	EXEC
ON		Appointment.GetSummary
TO		AppointmentHolder;

GRANT	EXEC
ON		Appointment.GetProtected
TO		AppointmentHolder;

GRANT	EXEC
ON		Appointment.GetCustomerNotes
TO		AppointmentHolder;

GRANT	EXEC
ON		Schema::Info
TO		AppointmentHolder;

ALTER ROLE AppointmentHolder
ADD MEMBER User_Appointment_Holder;