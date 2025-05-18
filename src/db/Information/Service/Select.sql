USE WALTRONICS;
GO

DROP PROCEDURE Info.Services;
GO

CREATE PROCEDURE Info.Services
AS
BEGIN
	SET NOCOUNT ON;
	SELECT		Class,
				Division,
				Service,
				Info.ServiceClass.ClassID,
				Info.ServiceDivision.DivisionID,
				ServiceID
	FROM		Info.Service
	JOIN		Info.ServiceDivision			ON	Info.Service.DivisionID = Info.ServiceDivision.DivisionID
	JOIN		Info.ServiceClass				ON	Info.ServiceDivision.ClassID = Info.ServiceClass.ClassID
	ORDER BY	Info.ServiceClass.Class			ASC,
				Info.ServiceDivision.Division	ASC,
				Info.Service.Service			ASC;
END;
GO