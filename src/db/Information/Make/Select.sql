USE WALTRONICS;
GO

DROP PROCEDURE Info.Makes;
GO

CREATE PROCEDURE Info.Makes
AS
BEGIN
	SET NOCOUNT ON;
	SELECT	Make
	FROM	Info.Make;
END;
GO