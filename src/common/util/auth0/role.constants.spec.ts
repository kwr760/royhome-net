import {
  OWNER, TOKEN_URL, ROLES,
} from './role.constants';

describe('util/auth0/constants', () => {
  it('should provide constants', () => {
    // Arrange/Act
    const expectedOwner = 'owner';
    const expectedTokenUrl = 'http://royhome.net';
    const expectedNumberRoles = 5;
    const expectedFriend = 'friend';
    const expectedEngineer = 'engineer';
    const expectedFamily = 'family';
    const expectedCompany = 'company';
    const expectedAdmin = 'admin';

    // Assert
    expect(OWNER).toEqual(expectedOwner);
    expect(TOKEN_URL).toEqual(expectedTokenUrl);
    expect(Object.keys(ROLES).length).toEqual(expectedNumberRoles);
    expect(ROLES.ADMIN).toEqual(expectedAdmin);
    expect(ROLES.COMPANY).toEqual(expectedCompany);
    expect(ROLES.ENGINEER).toEqual(expectedEngineer);
    expect(ROLES.FAMILY).toEqual(expectedFamily);
    expect(ROLES.FRIEND).toEqual(expectedFriend);
  });
});
