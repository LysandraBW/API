USE WALTRONICS;
GO

DROP PROCEDURE Info.Labels;
GO

CREATE PROCEDURE Info.Labels
AS
BEGIN
	SET NOCOUNT ON;
	SELECT	LabelID,
			Label
	FROM	Info.Label;
END;
GO