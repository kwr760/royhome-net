INSERT INTO auth0_login(auth0_login_id, email, user_id)
    VALUES (1, 'kroy760@gmail.com', 1);
INSERT INTO resume_owner(resume_owner_id, user_id, name)
    VALUES (1, 1, 'Kevin Roy');
INSERT INTO resume_address(resume_address_id, resume_owner_id, address)
    VALUES (1, 1, 'Issaquah, WA  98027');
INSERT INTO resume_contact(resume_contact_id, resume_owner_id, phone, display_phone, email)
    VALUES (1, 1, '(425) 208-1223', false, 'kroy760@gmail.com');
