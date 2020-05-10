CREATE SEQUENCE auth0_login_id_seq;
CREATE SEQUENCE auth0_login_user_id_seq;
CREATE TABLE login_auth0
(
  id integer NOT NULL DEFAULT nextval('auth0_login_id_seq'::regclass) PRIMARY KEY,
  user_id integer NULL DEFAULT nextval('auth0_login_user_id_seq'::regclass),
  email character varying(50) NOT NULL
);
ALTER TABLE login_auth0 OWNER TO server;

CREATE SEQUENCE resume_owner_id_seq;
CREATE TABLE resume_owner
(
  id integer NOT NULL DEFAULT nextval('resume_owner_id_seq'::regclass) PRIMARY KEY,
  user_id integer NOT NULL,
  name character varying(50) NOT NULL
);
ALTER TABLE resume_owner OWNER TO server;

CREATE SEQUENCE resume_address_id_seq;
CREATE TABLE resume_address
(
  id integer NOT NULL DEFAULT nextval('resume_address_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (resume_owner_id),
  address character varying(50) NOT NULL
);
ALTER TABLE resume_owner OWNER TO server;

CREATE SEQUENCE resume_contact_id_seq;
CREATE TABLE resume_contact
(
  id integer NOT NULL DEFAULT nextval('resume_contact_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (resume_owner_id),
  phone character varying(20) NOT NULL,
  display_phone boolean NOT NULL,
  email character varying(50) NOT NULL
);
ALTER TABLE resume_contact OWNER TO server;

