import {User as PrivateUser} from '@/types/entities';

export type Nullable<T> = T | null;

export type InertiaSharedProps<T = {}> = T & {
  appName: string;
  isRtl: boolean;
  locale: string;
  domain: string;
  appUrl: string;
  auth: {
    user: PrivateUser;
  }
  errorBags: any;
  errors: any;
  year: number;
};
