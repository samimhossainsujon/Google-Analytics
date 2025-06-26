'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

export function RealTimeIndicator() {
  const [isLive, setIsLive] = useState(true);
  const [activeUsers, setActiveUsers] = useState(247);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
      <div className={`w-2 h-2 rounded-full mr-2 ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
      {activeUsers} active users
    </Badge>
  );
}