
import React from 'react';
import { CONTENT } from '../../lib/content';

export const AlertMissing: React.FC<{ label: string }> = ({ label }) => {
  if (!CONTENT.isDev) return null;
  return (
    <span className="inline-flex items-center text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200 ml-1">
      <span className="mr-1">⚠️</span> {label}
    </span>
  );
};
