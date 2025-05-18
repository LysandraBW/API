USE WALTRONICS;
GO

-- CREATE LOGIN Standard WITH PASSWORD = 'de86346e41516a4eb57312e4a7c999e4';
-- CREATE LOGIN Employee WITH PASSWORD = 'c7ce77858cef23f620a221da87c007cf';
-- CREATE LOGIN AppointmentHolder WITH PASSWORD = '63684bcbafa12da599ceb6569f1f40da';

-- INSERT INTO Employee.Employee
-- VALUES (
-- 	DEFAULT,
-- 	'Fred',
-- 	'Jones',
-- 	'jones@mail.com',
-- 	'000-000-0000'
-- )
-- 
-- INSERT INTO Employee.Login
-- VALUES (
-- 	'9B05BE7E-B001-F011-A3CA-00155D92639B',
-- 	'fred',
-- 	HASHBYTES('SHA2_256', 'jones')
-- );

 INSERT INTO Employee.Employee
 VALUES (
 	DEFAULT,
 	'Shaggy',
 	'Rogers',
 	'rogers@mail.com',
 	'100-000-0000'
 );

 SELECT * FROM Employee.Employee;
 
 INSERT INTO Employee.Login
 VALUES (
 	'17D6591A-4F03-F011-A3CD-30F6EF05027A',
 	'shaggy',
 	HASHBYTES('SHA2_256', 'rogers')
 );