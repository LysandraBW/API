USE WALTRONICS;
GO

DROP TABLE Info.ServiceClass;
CREATE TABLE Info.ServiceClass (
	ClassID	INT			NOT NULL,
	Class	VARCHAR(50)	NOT NULL	UNIQUE,
	PRIMARY KEY (ClassID)
);

DROP TABLE Info.ServiceDivision;
CREATE TABLE Info.ServiceDivision (
	ClassID		INT			NOT NULL,
	DivisionID	INT			NOT NULL,
	Division	VARCHAR(50) NOT NULL,
	PRIMARY KEY (DivisionID),
	FOREIGN KEY	(ClassID) REFERENCES Info.ServiceClass (ClassID) ON DELETE CASCADE
);

DROP TABLE Info.Service;
CREATE TABLE Info.Service (
	ServiceID	INT			IDENTITY (1,1),
	DivisionID	INT			NOT	NULL,
	Service		VARCHAR(50)	NOT NULL,
	PRIMARY KEY (ServiceID),
	FOREIGN KEY (DivisionID) REFERENCES Info.ServiceDivision (DivisionID) ON DELETE CASCADE
);

INSERT INTO Info.ServiceClass VALUES (0, 'Unknown');
INSERT INTO Info.ServiceClass VALUES (1, 'Detailing');
INSERT INTO Info.ServiceClass VALUES (2, 'Maintenance');
INSERT INTO Info.ServiceClass VALUES (3, 'Repair');

INSERT INTO Info.ServiceDivision VALUES (0, 0, 'Other/I Don''t Know');
INSERT INTO Info.ServiceDivision VALUES (1, 1, 'Interior');
INSERT INTO Info.ServiceDivision VALUES (1, 2, 'Exterior');
INSERT INTO Info.ServiceDivision VALUES (2, 4, 'Fluid');
INSERT INTO Info.ServiceDivision VALUES (2, 5, 'Filter');
INSERT INTO Info.ServiceDivision VALUES (2, 6, 'Tire and Brake');
INSERT INTO Info.ServiceDivision VALUES (2, 7, 'Electrical');
INSERT INTO Info.ServiceDivision VALUES (2, 8, 'Exterior');
INSERT INTO Info.ServiceDivision VALUES (2, 9, 'Engine');
INSERT INTO Info.ServiceDivision VALUES (3, 10, 'Engine and Transmission');
INSERT INTO Info.ServiceDivision VALUES (3, 11, 'Suspension and Steering');
INSERT INTO Info.ServiceDivision VALUES (3, 12, 'Exhaust System');
INSERT INTO Info.ServiceDivision VALUES (3, 13, 'Electrical');
INSERT INTO Info.ServiceDivision VALUES (3, 14, 'Air Conditioning');

INSERT INTO Info.Service VALUES (0, 'Other/I Don''t Know');
INSERT INTO Info.Service VALUES (1, 'Standard Interior Cleaning');
INSERT INTO Info.Service VALUES (1, 'Premium Interior Cleaning');
INSERT INTO Info.Service VALUES (1, 'Deluxe Interior Cleaning');
INSERT INTO Info.Service VALUES (1, 'Custom Interior Cleaning');
INSERT INTO Info.Service VALUES (2, 'Washing and Drying');
INSERT INTO Info.Service VALUES (2, 'Ceramic Coating');
INSERT INTO Info.Service VALUES (2, 'Clay Bar Treatment');
INSERT INTO Info.Service VALUES (2, 'Paint Correction');
INSERT INTO Info.Service VALUES (2, 'Headlight Restoration');
INSERT INTO Info.Service VALUES (2, 'Plastic Trim Restoration');
INSERT INTO Info.Service VALUES (2, 'Chrome Trim Restoration');
INSERT INTO Info.Service VALUES (2, 'Tires and Rims');
INSERT INTO Info.Service VALUES (2, 'Engine Bay Cleaning');
INSERT INTO Info.Service VALUES (2, 'Waterspot Removal');
INSERT INTO Info.Service VALUES (4, 'Oil Change');
INSERT INTO Info.Service VALUES (4, 'Coolant Change');
INSERT INTO Info.Service VALUES (4, 'Brake Fluid Change');
INSERT INTO Info.Service VALUES (4, 'Transmission Fluid Change');
INSERT INTO Info.Service VALUES (4, 'Power Steering Fluid Change');
INSERT INTO Info.Service VALUES (4, 'Differential Fluid Change');
INSERT INTO Info.Service VALUES (4, 'Washer Fluid Change');
INSERT INTO Info.Service VALUES (4, 'Differential Fluid Change');
INSERT INTO Info.Service VALUES (5, 'Oil Filter Change');
INSERT INTO Info.Service VALUES (5, 'Air Filter Replacement');
INSERT INTO Info.Service VALUES (5, 'Cabin Air Filter Replacement');
INSERT INTO Info.Service VALUES (5, 'Fuel Filter Replacement');
INSERT INTO Info.Service VALUES (6, 'Tire Rotation and Balancing');
INSERT INTO Info.Service VALUES (6, 'Tire Pressure Adjustment');
INSERT INTO Info.Service VALUES (6, 'Brake Pad Replacement');
INSERT INTO Info.Service VALUES (6, 'Brake Rotor Resurfacing');
INSERT INTO Info.Service VALUES (6, 'Brake Rotor Replacement');
INSERT INTO Info.Service VALUES (7, 'Battery Replacement');
INSERT INTO Info.Service VALUES (7, 'Alternator Replacement');
INSERT INTO Info.Service VALUES (7, 'Starter Replacement');
INSERT INTO Info.Service VALUES (7, 'Electrical System Inspection');
INSERT INTO Info.Service VALUES (8, 'Wiper Blade Replacement');
INSERT INTO Info.Service VALUES (8, 'Wiper Arm Adjustment');
INSERT INTO Info.Service VALUES (8, 'Headlight Replacement');
INSERT INTO Info.Service VALUES (8, 'Tail Light Replacement');
INSERT INTO Info.Service VALUES (8, 'Fog Light Replacement');
INSERT INTO Info.Service VALUES (9, 'Spark Plugs Replacement');
INSERT INTO Info.Service VALUES (9, 'Ignition Coil Replacement');
INSERT INTO Info.Service VALUES (9, 'Radiator Replacement');
INSERT INTO Info.Service VALUES (9, 'Fuel Pump Replacement');
INSERT INTO Info.Service VALUES (9, 'Water Pump Replacement');
INSERT INTO Info.Service VALUES (10, 'Engine');
INSERT INTO Info.Service VALUES (10, 'Transmission');
INSERT INTO Info.Service VALUES (10, 'Timing Belt/Chain Replacement');
INSERT INTO Info.Service VALUES (11, 'Shock Absorber and Strut Replacement');
INSERT INTO Info.Service VALUES (11, 'Suspension System Inspection');
INSERT INTO Info.Service VALUES (12, 'Exhaust System Inspection');
INSERT INTO Info.Service VALUES (12, 'Catalytic Converter');
INSERT INTO Info.Service VALUES (12, 'Muffler Replacement');
INSERT INTO Info.Service VALUES (13, 'Electrical System Inspection');
INSERT INTO Info.Service VALUES (13, 'Wiring Repair and Replacement');
INSERT INTO Info.Service VALUES (13, 'Fuse Replacement');
INSERT INTO Info.Service VALUES (14, 'HVAC System Repair');
INSERT INTO Info.Service VALUES (14, 'HVAC Refrigerant Refill');
INSERT INTO Info.Service VALUES (14, 'Heater Core Inspection');
INSERT INTO Info.Service VALUES (14, 'Refrigerant Leak');