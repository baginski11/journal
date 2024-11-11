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
  settings: {
    extensions: Extension[]
  }
}

export interface Extension {
  name: string
  tokenId: string
  enabled: boolean
  options: ExtensionGroupOption[]
}
export interface ExtensionGroupOption {
  groupId: string
  enabled: boolean
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
