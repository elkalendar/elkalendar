import { Page } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { InertiaSharedProps } from '@/types/types';

export default function useTypedPage<T = {}>() {
  return usePage<Page<InertiaSharedProps<T>>>();
}
