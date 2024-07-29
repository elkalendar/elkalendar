import {IntegrationProviders} from "@/enums/IntegrationProviders";

export interface User {
  id: string;
  name: string;
  avatar: string;
  username: string;
  link: string;
  email: string;
  profileMessage: string;
  createdAt: string;
  isVerified: boolean;
  timezone: string;
  country: string;
  timeFormat: string;
  theme: string;
  allowSeoIndexing: boolean;
}

export interface App {
  name: string;
  description: string;
  icon: string;
  key: string;
  category: string;

}

export interface Host {
  name: string;
  avatar: string;
  username: string;
  link: string;
  profileMessage: string;
  timezone: string;
}

export interface UserPublic {
  id: string;
  name: string;
  avatar: string;
  username: string;
  link: string;
  profileMessage: string;
}

export interface EventLocation {
  id: string;
  type: string;
  position: number;
  data: any;
}

export interface Event {
  id: string;
  userId: string;
  name: string;
  description: string;
  locations: EventLocation[];
  slug: string;
  duration: number;
  visible: boolean;
  color: string;
  link: string;
  fields: any;
  createdAt: string;
  maxFutureBookingDate?: string;
  scheduleId?: string;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  provider: IntegrationProviders;
  provider_id: string;
  email: string;
  nickname: string;
  avatar: string;
}

export interface Invitee {
  name: string;
  email: string;
}

export interface ScheduleIntervalSlot {
  from: string;
  to: string;
}

export interface ScheduleInterval {
  sunday: ScheduleIntervalSlot[];
  monday: ScheduleIntervalSlot[];
  tuesday: ScheduleIntervalSlot[];
  wednesday: ScheduleIntervalSlot[];
  thursday: ScheduleIntervalSlot[];
  friday: ScheduleIntervalSlot[];
}

export interface Schedule {
  id: string;
  name: string;
  timezone: string;
  isDefault: boolean;
  intervals: ScheduleInterval[];
}

export interface Booking {
  id: string;
  createdAt: string;
  isCancelled: boolean;
  cancelledAt: string;
  isPastHost: boolean;
  isPastGuest: boolean;
  startTimeHost: string;
  endTimeHost: string;
  startTimeGuest: string;
  endTimeGuest: string;
  event: Event;
  invitee: Invitee;
  guestCount: number;
  timezone: string;
  location: EventLocation;
  notes: string;
  addToCalendarLinksHost: {
    google: string;
    outlook: string;
    office: string;
  }
  addToCalendarLinksGuest: {
    google: string;
    outlook: string;
    office: string;
  }
}
