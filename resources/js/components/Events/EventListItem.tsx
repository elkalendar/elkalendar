import { Link } from '@inertiajs/inertia-react';
import React from 'react';

export default function EventListItem(props: any) {
  return (
    <Link
      href={`/${props.username}/${props.event.slug}`}
      className="mb-2 duration-75 hover:bg-slate-200 transition-all rounded-sm flex items-center justify-between bg-slate-50 w-full py-2 px-4"
    >
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full ltr:mr-3 rtl:ml-3" style={{ backgroundColor: props.event.color }} />
        <p>{props.event.name}</p>
      </div>
      <div className="flex items-center text-sm text-slate-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <span className="mx-1">{props.event.duration}</span>
      </div>
    </Link>
  );
}
