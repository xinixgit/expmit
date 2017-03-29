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
	email VARCHAR(1023),
	PRIMARY KEY(id),
	FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

/* TEST DATA */
INSERT INTO instructor (name, intro, email) VALUES ('John Smith', 'Me, myself and I', 'instruct_email@hotmail.com');
INSERT INTO events (instructor_id, title, pic_url, description, location, time_start, time_end) VALUES (1, 'A trip to faraway', '/farawaypic.jpg', 'Lets go somewhere far away', 'There', CURDATE(), DATE(DATE_ADD(CURDATE(), INTERVAL 4 DAY)));
INSERT INTO events (instructor_id, title, pic_url, description, location, time_start, time_end) VALUES (1, 'A trip to nearby', '/nearbypic.jpg', 'Lets go somewhere nearby', 'Here', CURDATE(), DATE(DATE_ADD(CURDATE(), INTERVAL 1 DAY)));
INSERT INTO rsvp (event_id, email) VALUES (2, 'hello_kitty@gmail.com'), (2, 'hello_moto@gmail.com');