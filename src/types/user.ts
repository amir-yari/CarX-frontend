type User = {
  firstName: string;
  lastName: string;
  email: string;
  isLoggedIn: boolean;
  // password: string;
  userId?: string;
  phone?: string;
  passChangedOn?: Date;
  passChangedRequestedOn?: Date;
  passChangeHash?: string;
  DLN?: string;
  DLExpirationDate?: Date;
  DLCountry?: string;
  DLRegion?: string;
  dob?: Date;
  profileImage?: string;
};

export default User;
