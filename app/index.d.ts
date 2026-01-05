export interface BaseUser {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  imageUrl: string;
}

export interface UserData extends BaseUser {
  itineraryCreated: number | string;
  status: "user" | "admin";
}

export type User = BaseUser;

export interface Country {
  name: string;
  coordinates: [number, number];
  value: string;
  openStreetMap?: string;
}

export interface DropdownItem {
  name: string;
}

export interface SelectProps {
  data: Country[] | DropdownItem[];
  onValueChange: (value: string) => void;
  id: string;
  label: string;
  placeholder: string;
}

export interface PillProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

export interface Activity {
  time: string;
  description: string;
}

export interface DayPlan {
  day: number;
  location: string;
  activities: Activity[];
}

export interface Location {
  city: string;
  coordinates: [number, number];
  openStreetMap: string;
}

export interface Trip {
  id: string;
  name: string;
  description: string;
  estimatedPrice: string;
  duration: number;
  budget: string;
  travelStyle: string;
  interests: string;
  groupType: string;
  country: string;
  imageUrls: string[];
  itinerary: DayPlan[];
  bestTimeToVisit: string[];
  weatherInfo: string[];
  location: Location;
  payment_link: string;
}

export interface TripCardProps {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  tags: string[];
  price: string;
}

export interface StatsCard {
  headerTitle: string;
  total: number;
  lastMonthCount: number;
  currentMonthCount: number;
}

export interface TrendResult {
  trend: "increment" | "decrement" | "no change";
  percentage: number;
}

export interface DashboardStats {
  totalUsers: number;
  usersJoined: {
    currentMonth: number;
    lastMonth: number;
  };
  userRole: {
    total: number;
    currentMonth: number;
    lastMonth: number;
  };
  totalTrips: number;
  tripsCreated: {
    currentMonth: number;
    lastMonth: number;
  };
}

export interface CreateTripResponse {
  id?: string;
}

export interface DestinationProps {
  containerClass?: string;
  bigCard?: boolean;
  activityCount: number;
  rating: number;
  bgImage: string;
  title: string;
}

export namespace Models {
  interface Document {
    [key: string]: unknown;
  }
}

export type GetAllTripsResponse = {
  allTrips: Models.Document[];
  total: number;
};

export interface UsersItineraryCount {
  imageUrl: string;
  name: string;
  count: number;
}

export interface TripsInterest {
  imageUrl: string;
  name: string;
  interest: string;
}

export interface InfoPillProps {
  text: string;
  image: string;
}

export interface TripFormData {
  country: string;
  travelStyle: string;
  interest: string;
  budget: string;
  duration: number;
  groupType: string;
}

export interface DashboardTrip {
  id: number;
  name: string;
  imageUrls: string[];
  itinerary: { location: string }[];
  tags: string[];
  travelStyle: string;
  estimatedPrice: string;
}

