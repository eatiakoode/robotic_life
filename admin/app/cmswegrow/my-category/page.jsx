'use client';

import dynamic from 'next/dynamic';

const MyCategory = dynamic(() => import('@/components/dashboard/my-category'), {
  ssr: false,
});

export default function Page() {
  return <MyCategory />;
}
