
\echo Run Update Script
\echo

CREATE SEQUENCE auth0_login_id_seq;
CREATE SEQUENCE auth0_login_user_id_seq;
CREATE TABLE login_auth0
(
  id integer NOT NULL DEFAULT nextval('auth0_login_id_seq'::regclass) PRIMARY KEY,
  user_id integer NULL DEFAULT nextval('auth0_login_user_id_seq'::regclass),
  email text NOT NULL
);
ALTER TABLE login_auth0 OWNER TO server;
INSERT INTO login_auth0(id, email, user_id)
    VALUES (1, 'kroy760@gmail.com', 1);


CREATE SEQUENCE resume_owner_id_seq;
CREATE TABLE resume_owner
(
  id integer NOT NULL DEFAULT nextval('resume_owner_id_seq'::regclass) PRIMARY KEY,
  user_id integer NOT NULL,
  name text NOT NULL
);
ALTER TABLE resume_owner OWNER TO server;

INSERT INTO resume_owner(id, user_id, name)
    VALUES (1, 1, 'Kevin Roy');


CREATE SEQUENCE resume_address_id_seq;
CREATE TABLE resume_address
(
  id integer NOT NULL DEFAULT nextval('resume_address_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (id),
  address text NOT NULL
);
ALTER TABLE resume_owner OWNER TO server;

INSERT INTO resume_address(id, user_id, address)
    VALUES (1, 1, 'Issaquah, WA  98027');


CREATE SEQUENCE resume_contact_id_seq;
CREATE TABLE resume_contact
(
  id integer NOT NULL DEFAULT nextval('resume_contact_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (id),
  phone text NOT NULL,
  display_phone boolean NOT NULL,
  email text NOT NULL
);
ALTER TABLE resume_contact OWNER TO server;

INSERT INTO resume_contact(id, user_id, phone, display_phone, email)
    VALUES (1, 1, '(425) 208-1223', false, 'kroy760@gmail.com');


CREATE SEQUENCE resume_summary_id_seq;
CREATE TABLE resume_summary
(
  id integer NOT NULL DEFAULT nextval('resume_summary_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (id),
  summary text NOT NULL
);
ALTER TABLE resume_summary OWNER TO server;

INSERT INTO resume_summary(id, user_id, summary)
    VALUES (1, 1, 'Proactive and results-oriented professional with experience as technical leader on fast-paced and time-critical projects. Aggressive at overcoming challenges by developing robust solutions. Exceptional communicator and practitioner of full-cycle communications with capacity to independently manage complex software projects and support organizational customer service, quality assurance and sales goals.');


CREATE SEQUENCE resume_education_id_seq;
CREATE TABLE resume_education
(
  id integer NOT NULL DEFAULT nextval('resume_education_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (id),
  degree text NOT NULL,
  school text NOT NULL,
  graduation_date date NOT NULL
);
ALTER TABLE resume_education OWNER TO server;

INSERT INTO resume_education(id, user_id, degree, school, graduation_date)
    VALUES (1, 1, 'Master of Science in Computer Science', 'University of Massachusetts at Lowell', '2001-02-01');
INSERT INTO resume_education(id, user_id, degree, school, graduation_date)
    VALUES (2, 1, 'Bachelor of Science in Computer Science', 'Worcester Polytechnic Institute', '1994-05-01');

