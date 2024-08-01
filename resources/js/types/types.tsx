import {User as PrivateUser} from '@/types/entities';

export type Nullable<T> = T | null;

export type InertiaSharedProps<T = {}> = T & {
  appName: string;
  appUrl: string;
  auth: {
    user: {
      data: PrivateUser
    };
  }

  errorBags: any;
  errors: any;
};
