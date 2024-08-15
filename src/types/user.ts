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
  DLExpirationDate?: string;
  DLCountry?: string;
  DLRegion?: string;
  dob?: string;
  profileImage?: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
};

export default User;
