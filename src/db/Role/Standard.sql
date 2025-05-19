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

GRANT	EXEC
ON		Appointment.Lookup
TO		Standard;

GRANT	EXEC
ON		Schema::Session
TO		Standard;

GRANT	EXEC
ON		Employee.LoginEmployee
TO		Standard;

ALTER ROLE Standard
ADD MEMBER User_Standard;