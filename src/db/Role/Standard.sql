USE WALTRONICS;
GO

-- CREATE ROLE Standard;

REVOKE	ALTER,
		DELETE,
		EXECUTE,
		INSERT,
		SELECT,
		UPDATE,
		REFERENCES
TO		Standard;

GRANT	EXEC
ON		Schema::Info
TO		Standard;

-- Why should standard users have access to this functionality?
-- Wouldn't this allow adversaries to add a bunch of defined services for an appointment?
-- GRANT	EXEC
-- ON		Appointment.InsertAppointment
-- TO	 	Standard;

-- GRANT	EXEC
-- ON		Appointment.InsertDefinedService
-- TO		Standard;
GRANT	EXEC
ON		Schema::Session
TO		Standard;

GRANT	EXEC
ON		Employee.LoginEmployee
TO		Standard;

ALTER ROLE Standard
ADD MEMBER User_Standard;