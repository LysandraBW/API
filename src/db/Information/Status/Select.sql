USE WALTRONICS;
GO

DROP PROCEDURE Info.Statuses;
GO

CREATE PROCEDURE Info.Statuses
AS
BEGIN
	SET NOCOUNT ON;
	SELECT		StatusID,
				Status
	FROM		Info.Status
	ORDER BY	StatusID ASC;
END;
GO