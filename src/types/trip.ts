import Car from "./car";
import Host from "./host";
import User from "./user";

type Trip = {
  Car: Car;
  User: User;
  Host: Host;
  from: Date;
  to: Date;
  tripId?: string;
  paymentId?: string;
  pickupAddress?: string;
  pickupPostalCode?: string;
  pickupCity?: string;
  pickupRegion?: string;
  pickupCountry?: string;
  returnAddress?: string;
  returnPostalCode?: string;
  returnCity?: string;
  returnRegion?: string;
  returnCountry?: string;
};

export default Trip;
