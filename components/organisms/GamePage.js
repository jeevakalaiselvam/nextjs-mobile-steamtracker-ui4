import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function GamePage() {
  const router = useRouter();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;
  useEffect(() => {
    if (!Object.keys(games).length > 0) {
      router.push('/');
    }
  }, []);

  return <div>GamePage</div>;
}
