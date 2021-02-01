
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
INSERT INTO login_auth0(email) VALUES ('kroy760@gmail.com');


CREATE SEQUENCE resume_owner_id_seq;
CREATE TABLE resume_owner
(
  id integer NOT NULL DEFAULT nextval('resume_owner_id_seq'::regclass) PRIMARY KEY,
  user_id integer NOT NULL,
  name text NOT NULL
);
ALTER TABLE resume_owner OWNER TO server;

INSERT INTO resume_owner(user_id, name)
SELECT user_id, name FROM
( VALUES
  ('Kevin Roy')
) AS data(name)
JOIN login_auth0 ON email = 'kroy760@gmail.com';


CREATE SEQUENCE resume_address_id_seq;
CREATE TABLE resume_address
(
  id integer NOT NULL DEFAULT nextval('resume_address_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (id),
  address text NOT NULL
);
ALTER TABLE resume_owner OWNER TO server;

INSERT INTO resume_address(user_id, address)
SELECT user_id, address FROM
( VALUES
  ('Issaquah, WA  98027')
) AS data(address)
JOIN login_auth0 ON email = 'kroy760@gmail.com';


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

INSERT INTO resume_contact(user_id, phone, display_phone, email)
SELECT user_id, phone, display_phone, data.email FROM
( VALUES
  ('(425) 208-1223', false, 'kroy760@gmail.com')
) AS data(phone, display_phone, email)
JOIN login_auth0 ON login_auth0.email = 'kroy760@gmail.com';


CREATE SEQUENCE resume_summary_id_seq;
CREATE TABLE resume_summary
(
  id integer NOT NULL DEFAULT nextval('resume_summary_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (id),
  summary text NOT NULL
);
ALTER TABLE resume_summary OWNER TO server;

INSERT INTO resume_summary(user_id, summary)
SELECT user_id, summary FROM
( VALUES (
  'Diligent, Independent, Articulate.  Experienced Web Developer.  Prefers backend, enjoys UI ' ||
  'considers myself full stack. I have broad professional experience, looking to continue ' ||
  'to focus on developing complex application in a professional engineering environment.'
  )
) AS data(summary)
JOIN login_auth0 ON email = 'kroy760@gmail.com';


CREATE SEQUENCE resume_skill_id_seq;
CREATE TABLE resume_skill
(
  id integer NOT NULL DEFAULT nextval('resume_skill_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (id),
  position integer NOT NULL,
  name text NOT NULL
);
ALTER TABLE resume_skill OWNER TO server;

INSERT INTO resume_skill(user_id, position, name)
SELECT user_id, row_number() over () AS position, skill FROM
( VALUES
  ('Languages'),
  ('Frameworks'),
  ('Tools'),
  ('Databases')
) AS data(skill)
JOIN login_auth0 ON email = 'kroy760@gmail.com';


CREATE SEQUENCE resume_skill_item_id_seq;
CREATE TABLE resume_skill_item
(
  id integer NOT NULL DEFAULT nextval('resume_skill_item_id_seq'::regclass) PRIMARY KEY,
  skill_id integer REFERENCES resume_skill (id),
  user_id integer REFERENCES resume_owner (id),
  position integer NOT NULL,
  item text NOT NULL
);
ALTER TABLE resume_skill_item OWNER TO server;

INSERT INTO resume_skill_item(skill_id, user_id, position, item)
SELECT resume_skill.id, login_auth0.user_id, pos, skill FROM
( VALUES
  ('Languages', 1, 'TypeScript'),
  ('Languages', 2, 'JavaScript'),
  ('Languages', 3, 'HTML'),
  ('Languages', 4, 'CSS'),
  ('Languages', 5, 'Kotlin'),
  ('Languages', 6, 'PHP'),
  ('Languages', 7, 'Java'),
  ('Languages', 8, 'C'),
  ('Languages', 9, 'C++'),
  ('Languages', 10, 'Perl'),
  ('Languages', 11, 'bash'),
  ('Frameworks', 1, 'React'),
  ('Frameworks', 2, 'React Redux'),
  ('Frameworks', 3, 'NodeJS'),
  ('Frameworks', 4, 'jest'),
  ('Frameworks', 5, 'enzyme'),
  ('Frameworks', 6, 'testing-library/react'),
  ('Frameworks', 7, 'webpack'),
  ('Frameworks', 8, 'loadable'),
  ('Frameworks', 9, 'Spring'),
  ('Frameworks', 11, 'reactstrap'),
  ('Frameworks', 12, 'flowtype'),
  ('Frameworks', 13, 'Axios'),
  ('Frameworks', 14, 'Material UI'),
  ('Frameworks', 15, 'jQuery'),
  ('Frameworks', 16, 'Resilence4J'),
  ('Frameworks', 17, 'PL/SQL'),
  ('Frameworks', 18, 'bootstrap'),
  ('Databases', 1, 'PostgreSQL'),
  ('Databases', 2, 'MySQL'),
  ('Databases', 3, 'Oracle'),
  ('Databases', 4, 'SQL Server'),
  ('Tools', 1, 'git'),
  ('Tools', 2, 'Jira'),
  ('Tools', 3, 'Confluence'),
  ('Tools', 4, 'Splunk'),
  ('Tools', 5, 'docker'),
  ('Tools', 6, 'Jenkins'),
  ('Tools', 7, 'Datadog'),
  ('Tools', 8, 'Gradle'),
  ('Tools', 9, 'maven'),
  ('Tools', 11, 'AWS'),
  ('Tools', 12, 'IntelliJ'),
  ('Tools', 13, 'vim'),
  ('Tools', 14, 'PhantomJS'),
  ('Tools', 15, 'ClearCase')
) AS data(skill_group, pos, skill)
JOIN login_auth0 ON email = 'kroy760@gmail.com'
JOIN resume_skill ON name = skill_group;


CREATE SEQUENCE resume_experience_id_seq;
CREATE TABLE resume_experience
(
  id integer NOT NULL DEFAULT nextval('resume_experience_id_seq'::regclass) PRIMARY KEY,
  user_id integer REFERENCES resume_owner (id),
  position integer NOT NULL,
  title text NOT NULL,
  company text NOT NULL,
  start_date date NOT NULL,
  end_date date
);
ALTER TABLE resume_experience OWNER TO server;

INSERT INTO resume_experience(user_id, position, title, company, start_date, end_date)
SELECT user_id, position, title, company, date(start_date), date(end_date) FROM
( VALUES
  (1, 'Software Development Engineer III', 'Expedia Group', '2018-06-25', NULL),
  (2, 'Technical Lead', 'Sterling Talent Solutions', '2012-05-01', '2018-06-25'),
  (3, 'Senior Software Engineer', 'Applied Discovery, Inc.', '2010-10-01', '2012-04-01'),
  (4, 'Software Engineer/Technical Lead', 'SofTech, Inc.', '2001-03-01', '2010-10-01'),
  (5, 'Contractor/Software Engineer', 'OrderTrust', '2000-02-01', '2001-03-01'),
  (6, 'Software Engineer', 'PSW Technology', '1999-04-01', '2000-02-01'),
  (7, 'Contractor', 'Celestica, Inc.', '1997-05-01', '1999-04-01'),
  (8, 'Project Leader/Software Engineer', 'Boston Technology, Inc.', '1995-12-01', '1997-05-01'),
  (9, 'Software Engineer', 'ESSENSE Systems, Inc.', '1994-08-01', '1995-12-01')
) AS data(position, title, company, start_date, end_date)
JOIN login_auth0 ON email = 'kroy760@gmail.com';


CREATE SEQUENCE resume_experience_item_id_seq;
CREATE TABLE resume_experience_item
(
  id integer NOT NULL DEFAULT nextval('resume_experience_item_id_seq'::regclass) PRIMARY KEY,
  experience_id integer REFERENCES resume_experience (id),
  user_id integer REFERENCES resume_owner (id),
  position integer NOT NULL,
  type text NOT NULL,
  item text NOT NULL
);
ALTER TABLE resume_experience_item OWNER TO server;

INSERT INTO resume_experience_item(experience_id, user_id, position, type, item)
SELECT resume_experience.id, login_auth0.user_id, pos, type, item FROM
( VALUES
  ('Expedia Group', 1, 'text',
   'Worked in an organization responsible for the messaging tool for customer agents.  This tool connects the ' ||
   'customer with the agent.  The tool provides a branded experience with the use of channels, allowing the ' ||
   'customer to communication with chat, email, service requests, and a voice experience.'),
  ('Expedia Group', 2, 'text',
   'The team rebuilt the application using React on the front-end and Java/Kotlin on the back-end.  I worked ' ||
   'primarily on the front-end but communicated through technical and product teams.'),
  ('Expedia Group', 3, 'bullet',
   'Branded the Agent Messaging Tool: the project took the existing styling and converted it to our branded ' ||
   'UITK framework.'),
  ('Expedia Group', 3, 'bullet',
   'Agent Messaging Tool: Worked on various features, one of the larger features being a tool to protect PCI ' ||
   'information while the agent enters protected customer information.  This was a complex interaction between ' ||
   'multiple back-end system'),
  ('Expedia Group', 4, 'bullet',
   'Virtual Agent API Server: Worked on a Kotlin API server.  Created an asynchronous endpoint to change the state ' ||
   'of the conversation, from reserved to released.  As it was a new server setup/implemented basic server ' ||
   'functionality, such as retries, circuit breaker, haystack id, and others.'),
  ('Expedia Group', 5, 'bullet',
   'Rich Card Server: Created a server for a new "technology" called rich-cards, this server/repository with build ' ||
   'process.  This repository is used by multiple projects and requires the building of certain resources, the ' ||
   'packages and branded CSS files'),
  ('Expedia Group', 6, 'bullet',
   'Outbound voice:  this project enabled agents to place a softphone call from the agent messaging tool.'),
  ('Expedia Group', 10, 'tech', 'Ubuntu'),
  ('Expedia Group', 11, 'tech', 'React'),
  ('Expedia Group', 12, 'tech', 'Kotlin'),
  ('Expedia Group', 13, 'tech', 'NodeJS'),
  ('Expedia Group', 14, 'tech', 'React Redux'),
  ('Expedia Group', 15, 'tech', 'webpack'),
  ('Expedia Group', 16, 'tech', 'jest'),
  ('Expedia Group', 17, 'tech', 'Spring'),
  ('Expedia Group', 18, 'tech', 'Enzyme'),
  ('Expedia Group', 19, 'tech', 'testing-library/react'),
  ('Expedia Group', 20, 'tech', 'AWS'),
  ('Expedia Group', 21, 'tech', 'Jenkins'),
  ('Expedia Group', 22, 'tech', 'Splunk'),
  ('Expedia Group', 23, 'tech', 'Datadog'),

  ('Sterling Talent Solutions', 1, 'text',
   'A key contributor on developing a product in a small aggressive company to be acquired by a large industry ' ||
   'leader. We provided quality background screening and onboarding solutions. Worked in major areas of the company ' ||
   'and developed multiple large features individually and as a leader in the team.'),
  ('Sterling Talent Solutions', 2, 'text',
   'I worked on two major aspects of the company''s product. The first is a highly configurable form based data ' ||
   'collection framework. The second being the position and processing of the various searches and the surrounding ' ||
   'compliance.'),
  ('Sterling Talent Solutions', 3, 'bullet',
   'Fair Chance: Implemented the current states requirements for a process similar to Individualized Assessment ' ||
   'including filling out state provided forms.'),
  ('Sterling Talent Solutions', 4, 'bullet',
   'Individualized Assessment: Implemented the ability for the customer to request and process a candidate''s ' ||
   'response to an adverse action being preformed on a candidate.'),
  ('Sterling Talent Solutions', 5, 'bullet',
   'eDispute: Implemented the ability for the candidate to review and dispute the reports or searches preformed on them.'),
  ('Sterling Talent Solutions', 6, 'bullet',
   'Form Review: Implemented the customer''s ability to review the customized forms, including sending the form ' ||
   'back to the candidate for modification.'),
  ('Sterling Talent Solutions', 7, 'bullet',
   'E-signature: Developed the signing experience to provide confirmation that the user is certifying their actions. ' ||
   'Including the generation of a PDF from HTML.'),
  ('Sterling Talent Solutions', 8, 'bullet',
   'Candidate Model Export: Provided a feature to enable customer to export the data about their candidates.'),
  ('Sterling Talent Solutions', 9, 'bullet',
   'Professional Services Billing System: Enable another team to easily bill a customer based on their ' ||
   'individual contracts.'),
  ('Sterling Talent Solutions', 10, 'tech', 'Ubuntu'),
  ('Sterling Talent Solutions', 11, 'tech', 'Apache'),
  ('Sterling Talent Solutions', 12, 'tech', 'MySQL'),
  ('Sterling Talent Solutions', 13, 'tech', 'PHP'),
  ('Sterling Talent Solutions', 14, 'tech', 'HTML'),
  ('Sterling Talent Solutions', 15, 'tech', 'JavaScript'),
  ('Sterling Talent Solutions', 16, 'tech', 'CSS'),
  ('Sterling Talent Solutions', 17, 'tech', 'PhantomJS'),
  ('Sterling Talent Solutions', 18, 'tech', 'IntelliJ'),
  ('Sterling Talent Solutions', 19, 'tech', 'PHPUnit'),
  ('Applied Discovery, Inc.', 1, 'text',
   'Worked on team to design the next generation e-Discovery processing line using open source technologies.'),
  ('Applied Discovery, Inc.', 2, 'bullet',
   'Researched and evaluated various technologies: Parallel Processing Framework and grid (Globus/Condor/JPPF), ' ||
   'workflow technologies (jPBM), JBoss, RESTful, Hibernate, Boost, Oracle’s OutsideIn, Google’s Guice, ' ||
   'Talend and others.'),
  ('Applied Discovery, Inc.', 3, 'bullet',
   'Implemented Straw man of new system written in Java using a RESTful API.'),
  ('Applied Discovery, Inc.', 4, 'bullet',
   'Implemented an Object-Oriented Application (C++) to utilize Oracle’s OutsideIn Technology to parse and load ' ||
   'Microsoft Outlook pst file.'),
  ('Applied Discovery, Inc.', 5, 'tech', 'Java'),
  ('Applied Discovery, Inc.', 6, 'tech', 'C'),
  ('Applied Discovery, Inc.', 7, 'tech', 'C++'),
  ('Applied Discovery, Inc.', 8, 'tech', 'Windows'),
  ('Applied Discovery, Inc.', 9, 'tech', 'Unix'),
  ('Applied Discovery, Inc.', 10, 'tech', 'SQL Server'),
  ('SofTech, Inc.', 1, 'text',
   'Worked on a product lifecycle management product to provide new features, maintenance and customer support ' ||
   'for medium-sized businesses. Managed Pro/C coding, data, large configuration loading, APIs, licensing, ' ||
   'installations and research third-party product technical issues.'),
  ('SofTech, Inc.', 2, 'bullet',
   'Led technical effort to internationalize products into local languages that allowed sales in foreign markets.'),
  ('SofTech, Inc.', 3, 'bullet',
   'Designed and implemented revision editing tool that enabled administrators to define multiple revision ' ||
   'sequences and apply them to classes, which increased value of the company’s product line.'),
  ('SofTech, Inc.', 4, 'bullet',
   'Built feature that pushed files into replication servers to increase performance over the WAN.'),
  ('SofTech, Inc.', 5, 'bullet',
   'Transited to server-based report generation using libxml2 and libxslt technology to improve performance.'),
  ('SofTech, Inc.', 6, 'bullet',
   'Improved querying ability and performance by implementing a list like clause.'),
  ('SofTech, Inc.', 7, 'bullet',
   'Redesigned aspects of the product to enable developers to use QT technology that minimized maintenance ' ||
   'costs and enabled code reuse.'),
  ('SofTech, Inc.', 8, 'bullet',
   'Cross over to new code layers to resolve problems; demonstrated extra effort in fixing root causes, ' ||
   'keeping code simple, removing unused code and using build tools that increase productivity.'),
  ('SofTech, Inc.', 9, 'bullet',
   'Took initiative to rewrite header file architecture, which saved up to two hours of compile time.'),
  ('SofTech, Inc.', 10, 'tech', 'C'),
  ('SofTech, Inc.', 11, 'tech', 'C++'),
  ('SofTech, Inc.', 12, 'tech', 'Unix'),
  ('SofTech, Inc.', 13, 'tech', 'SQL'),
  ('SofTech, Inc.', 14, 'tech', 'Perl'),
  ('OrderTrust', 1, 'text',
   'Worked on main payment application in UNIX using C++ and Informix for provider of marketing and order ' ||
   'management services for online retailers and catalogs. Developed prototype value-added payment program in ' ||
   'J2EE and loyalty-based system of electronic coupons. Cleaned code and automated processes.'),
  ('OrderTrust', 2, 'bullet',
   'Simplified code maintenance of the entire system by moving legacy code into standardized build environment.'),
  ('OrderTrust', 3, 'bullet',
   'Automated testing Dining À la Card system with new systems using Perl script that improved accuracy and ' ||
   'reduced time needed to test systems and removed element of human error.'),
  ('OrderTrust', 4, 'tech', 'C++'),
  ('OrderTrust', 5, 'tech', 'Unix'),
  ('OrderTrust', 6, 'tech', 'SQL'),
  ('OrderTrust', 7, 'tech', 'Java'),
  ('OrderTrust', 8, 'tech', 'Perl'),
  ('PSW Technology', 1, 'text',
   'Worked for a consulting company for the IBM/Lotus Notes with 10 employees to port Lotus Notes and toolkits ' ||
   'to IBM AS/400 system and to correct bugs. Developed and convinced engineers to buy into solutions to problems.'),
  ('PSW Technology', 2, 'bullet',
   'Built portable code using a cross-compiler and corrected bugs using native AS/400 debugger.'),
  ('PSW Technology', 3, 'tech', 'C'),
  ('PSW Technology', 4, 'tech', 'AS/400'),
  ('Celestica, Inc.', 1, 'text',
   'Developed, repaired and enhanced programs and processes for electronics manufacturer using in-house ' ||
   'client/server application system to manage flow of process lines. Developed and debugged client/server ' ||
   'applications in C, Informix Embedded SQL and KornShell and created new modules for integration with ' ||
   'X Windows program and ESQL.'),
  ('Celestica, Inc.', 2, 'bullet',
   'Redesigned process of changing bill-of-materials workstation structures that avoided deadlocks.'),
  ('Celestica, Inc.', 3, 'bullet',
   'Fixed key user interface, enabling users to step through process of building workstations and PCs.'),
  ('Celestica, Inc.', 4, 'bullet',
   'Determined report needs of users that included finding lost workstations and bottlenecks and implemented ' ||
   'intranet-accessible reports using C, KornShell, HTML and Sapphire CGI generator.'),
  ('Celestica, Inc.', 5, 'tech', 'C/C++'),
  ('Celestica, Inc.', 6, 'tech', 'HP/UX'),
  ('Boston Technology, Inc.', 1, 'text',
   'Worked in the leading communications company that implemented voicemail systems for large ' ||
   'telecommunications companies to lead feature development and bug fixing projects. Including a ' ||
   'traffic statistic feature for voicemail application and fixed bugs for various international ' ||
   'projects written in C/C++ and fixed bugs in billing systems.'),
  ('Boston Technology, Inc.', 2, 'tech', 'C/C++'),
  ('Boston Technology, Inc.', 3, 'tech', 'SCO Unix'),
  ('Boston Technology, Inc.', 4, 'tech', 'SQL'),
  ('ESSENSE Systems, Inc.', 1, 'text',
   'Developed aspects of a data-driven GUI that empowered employees to manage their own human resource records.')
) AS data(item_company, pos, type, item)
JOIN login_auth0 ON login_auth0.email = 'kroy760@gmail.com'
JOIN resume_experience ON company = item_company;

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

INSERT INTO resume_education(user_id, degree, school, graduation_date)
SELECT user_id, degree, school, date(grad_date) FROM
( VALUES
  ('Master of Science in Computer Science', ' University of Massachusetts at Lowell', '2001-02-01'),
  ('Bachelor of Science in Computer Science', ' Worcester Polytechnic Institute', '1994-05-01')
) AS data(degree, school, grad_date)
JOIN login_auth0 ON email = 'kroy760@gmail.com';

