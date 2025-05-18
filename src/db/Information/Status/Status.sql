USE WALTRONICS;
GO

DROP TABLE Info.Status;

CREATE TABLE Info.Status (
	StatusID	INT				NOT NULL,
	Status		VARCHAR(25)		NOT NULL	UNIQUE,
	Description	VARCHAR(350)	NOT NULL,
	PRIMARY	KEY (StatusID)
);

INSERT INTO Info.Status VALUES (0, 'Pending', 'Your appointment request is pending and has not been scheduled yet. We will contact you by phone or email within 1-2 days to confirm your appointment. If you haven''t heard from us after 1-2 days, please feel free to contact us for further assistance.');
INSERT INTO Info.Status VALUES (1, 'Evaluation', 'Please bring your car in for evaluation at the given date and time. During the evaluation, we (1) diagnose your car''s issues and (2) provide you with an estimate. If you''re unable to make it, please contact us to reschedule. We''re here to assist you and accommodate your needs.');
INSERT INTO Info.Status VALUES (2, 'Scheduled', 'Your appointment has been scheduled, and our services will commence on the start date below. Please have your vehicle in by the scheduled date. We will contact you if there are any unforeseen changes or issues. Thank you.');
INSERT INTO Info.Status VALUES (3, 'In Progress', 'Your appointment is underway. Stay tuned for further details on your appointment, such as pictures, diagnosis, repairs, and parts information.');
INSERT INTO Info.Status VALUES (4, 'Done', 'Your appointment is complete. After payment, your vehicle will be ready for pickup. Thank you for working with us!');
INSERT INTO Info.Status VALUES (5, 'Completed', 'Your appointment has been successfully completed. Thank you for working with us!');
