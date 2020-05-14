
\echo Run Update Script
\echo

CREATE SEQUENCE auth0_login_id_seq;
CREATE SEQUENCE auth0_login_user_id_seq;
CREATE TABLE login_auth0
(
  id integer NOT NULL DEFAULT nextval('auth0_login_id_seq'::regclass) PRIMARY KEY,
  user_id integer NULL DEFAULT nextval('auth0_login_user_id_seq'::regclass),
  email character varying(50) NOT NULL
);
ALTER TABLE login_auth0 OWNER TO server;
INSERT INTO login_auth0(id, email, user_id)
    VALUES (1, 'kroy760@gmail.com', 1);


CREATE SEQUENCE resume_owner_id_seq;
CREATE TABLE resume_owner
(
  id integer NOT NULL DEFAULT nextval('resume_owner_id_seq'::regclass) PRIMARY KEY,
  user_id integer NOT NULL,
  name character varying(50) NOT NULL
);
ALTER TABLE resume_owner OWNER TO server;

INSERT INTO resume_owner(id, user_id, name)
    VALUES (1, 1, 'Kevin Roy');


CREATE SEQUENCE resume_address_id_seq;
CREATE TABLE resume_address
(
  id integer NOT NULL DEFAULT nextval('resume_address_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (id),
  address character varying(50) NOT NULL
);
ALTER TABLE resume_owner OWNER TO server;

INSERT INTO resume_address(id, user_id, address)
    VALUES (1, 1, 'Issaquah, WA  98027');


CREATE SEQUENCE resume_contact_id_seq;
CREATE TABLE resume_contact
(
  id integer NOT NULL DEFAULT nextval('resume_contact_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (id),
  phone character varying(20) NOT NULL,
  display_phone boolean NOT NULL,
  email character varying(50) NOT NULL
);
ALTER TABLE resume_contact OWNER TO server;

INSERT INTO resume_contact(id, user_id, phone, display_phone, email)
    VALUES (1, 1, '(425) 208-1223', false, 'kroy760@gmail.com');
