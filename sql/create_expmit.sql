USE expmit;

DROP TABLE IF EXISTS rsvp;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS instructor;

CREATE TABLE instructor (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(1023),
	intro TEXT,
	email VARCHAR(1023),
	PRIMARY KEY(id)
);

CREATE TABLE events (
	id INT NOT NULL AUTO_INCREMENT,
	instructor_id INT NOT NULL,
	title VARCHAR(1023) NOT NULL,
	pic_url VARCHAR(2047) NOT NULL,
	price FLOAT(10, 2) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(2047) NOT NULL,
	time_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	time_end TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (instructor_id) REFERENCES instructor(id)
);

CREATE TABLE rsvp (
	id INT NOT NULL AUTO_INCREMENT,
	event_id INT NOT NULL,
	email VARCHAR(255) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE INDEX rsvp_email on rsvp(email);

/* TEST DATA */
INSERT INTO instructor (name, intro, email) VALUES ('Xinxin Dai', 'Avid skier', 'igotemail10@gmail.com');
INSERT INTO events (instructor_id, title, pic_url, price, description, location, time_start, time_end) VALUES (1, 'Expired Event', '/event1.jpg', 90.00,'Im expired, you should not see me', 'Sunnyvale, CA', DATE(DATE_SUB(CURDATE(), INTERVAL 4 DAY)), DATE(DATE_SUB(CURDATE(), INTERVAL 2 DAY)));
INSERT INTO events (instructor_id, title, pic_url, price, description, location, time_start, time_end) VALUES (1, 'One day Northstar ski trip', '/images/events/event1.jpg', 90.00,'Private lesson for a day in Northstar, instructor will ski with students throughout the day. Unforgettable one day experience for ski or snowboard beginners', 'Sunnyvale, CA', CURDATE(), DATE(DATE_ADD(CURDATE(), INTERVAL 4 DAY)));
INSERT INTO rsvp (event_id, email) VALUES (1, 'hello_kitty@gmail.com'), (1, 'hello_moto@gmail.com');