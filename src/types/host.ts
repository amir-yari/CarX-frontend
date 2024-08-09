type Host = {
  firstName: string;
  lastName: string;
  email: string;
  //   password: string;
  hostId?: string;
  phone?: string;
  passChangedOn?: Date;
  passChangedRequestedOn?: Date;
  passChangeHash?: string;
  profileImage?: string;
};
export default Host;
