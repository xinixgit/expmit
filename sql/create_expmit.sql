USE expmit;

DROP TABLE IF EXISTS rsvp;
DROP TABLE IF EXISTS event_date;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS instructor;

CREATE TABLE instructor (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(1023),
	intro TEXT,
	email VARCHAR(1023),
	PRIMARY KEY(id)
);

CREATE TABLE event (
	id INT NOT NULL AUTO_INCREMENT,
	instructor_id INT NOT NULL,
	title VARCHAR(1023) NOT NULL,
	pic_url VARCHAR(2047) NOT NULL,
	price FLOAT(10, 2) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(2047) NOT NULL,	
	PRIMARY KEY(id),
	FOREIGN KEY (instructor_id) REFERENCES instructor(id)
);

CREATE TABLE event_date (
	id INT NOT NULL AUTO_INCREMENT,
	event_id INT NOT NULL,
	time_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	time_end TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE
);

CREATE TABLE rsvp (
	id INT NOT NULL AUTO_INCREMENT,
	event_id INT NOT NULL,
	event_date_id INT NOT NULL,
	email VARCHAR(255) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (event_date_id) REFERENCES event_date(id) ON DELETE CASCADE
);

CREATE INDEX rsvp_email on rsvp(email);

/* TEST DATA */
INSERT INTO instructor (name, intro, email) VALUES ('Xinxin Dai', 'Avid skier', 'igotemail10@gmail.com');
INSERT INTO event (instructor_id, title, pic_url, price, description, location) VALUES (1, 'Title Test', '/images/events/event1.jpg', 90.00,'Desc test', 'SF, CA');
INSERT INTO event (instructor_id, title, pic_url, price, description, location) VALUES (1, 'Title Test 2', '/images/events/event2.jpg', 90.00,'Desc 2 test', 'Sunnyvale, CA');
INSERT INTO event_date (event_id,time_start,time_end) VALUES (1, CURDATE(), DATE(DATE_ADD(CURDATE(), INTERVAL 1 DAY)));
INSERT INTO event_date (event_id,time_start,time_end) VALUES (2, DATE(DATE_SUB(CURDATE(), INTERVAL 2 DAY)), DATE(DATE_SUB(CURDATE(), INTERVAL 1 DAY)));
INSERT INTO event_date (event_id,time_start,time_end) VALUES (2, CURDATE(), DATE(DATE_ADD(CURDATE(), INTERVAL 1 DAY)));
INSERT INTO event_date (event_id,time_start,time_end) VALUES (2, DATE(DATE_ADD(CURDATE(), INTERVAL 1 DAY)), DATE(DATE_ADD(CURDATE(), INTERVAL 2 DAY)));
INSERT INTO rsvp (event_id, event_date_id, email) VALUES (2, 2, 'hello_kitty@gmail.com'), (2, 3, 'hello_moto@gmail.com');