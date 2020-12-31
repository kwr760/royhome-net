\pset tuples_only on

\echo Run Verification
\echo

SELECT
  'login_auth0',
  CASE WHEN COUNT(*) = 1 THEN 'PASS' ELSE 'FAIL' END
FROM login_auth0;
SELECT
  'resume_owner',
  CASE WHEN COUNT(*) = 1 THEN 'PASS' ELSE 'FAIL' END
FROM resume_owner;
SELECT
  'resume_contact',
  CASE WHEN COUNT(*) = 1 THEN 'PASS' ELSE 'FAIL' END
FROM resume_contact;
SELECT
  'resume_address',
  CASE WHEN COUNT(*) = 1 THEN 'PASS' ELSE 'FAIL' END
FROM resume_address;
SELECT
  'resume_summary',
  CASE WHEN COUNT(*) = 1 THEN 'PASS' ELSE 'FAIL' END
FROM resume_summary;
SELECT
    'resume_skill',
    CASE WHEN COUNT(*) = 4 THEN 'PASS' ELSE 'FAIL' END
FROM resume_skill;
SELECT
    'resume_skill_item',
    CASE WHEN COUNT(*) = 46 THEN 'PASS' ELSE 'FAIL' END
FROM resume_skill_item;
SELECT
    'resume_experience',
    CASE WHEN COUNT(*) = 9 THEN 'PASS' ELSE 'FAIL' END
FROM resume_experience;
SELECT
    'resume_experience_item',
    CASE WHEN COUNT(*) = 87 THEN 'PASS' ELSE 'FAIL' END
FROM resume_experience_item;
SELECT
  'resume_education',
  CASE WHEN COUNT(*) = 2 THEN 'PASS' ELSE 'FAIL' END
FROM resume_education;
