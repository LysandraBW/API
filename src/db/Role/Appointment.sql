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
ON		Appointment.GetCustomerNotes
TO		AppointmentHolder;

GRANT	EXEC
ON		Schema::Info
TO		AppointmentHolder;

--ALTER ROLE Customer
--ADD MEMBER User_Customer;