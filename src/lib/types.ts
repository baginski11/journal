export interface User {
  userId: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  isVerified: string
  createdAt: string
}

export interface Organization {
  orgId: string
  createdAt: string
  orgName: string
  orgOwnerId: string
  orgLogoURL: string
}

export interface Group {
  groupId: string
  createdAt: string
  groupName: string
  groupOrgId: string
}

export interface DummyUser {
  dummyId: string
  createdAt: string
  dummyFirstName: string
  dummyLastName: string
  dummyOrgId: string
  dummyGroupsIds: string[]
}

export interface Meeting {
  meetingId: string
  groupId: string
  orgId: string
  meetingDate: string
  meetingName: string
}

export interface Record {
  recordId: string
  meetingId: string
  dummyUserId: string
  orgId: string
  groupId: string
  value: string
  createdAt: string
}
