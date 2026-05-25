import type { ReactNode } from 'react';

interface ItemBadgeProps {
  children: ReactNode;
}

export function ItemBadge({ children }: ItemBadgeProps) {
  return (
    <span className="px-2 py-0.5 border border-gray-200 rounded-full text-xs text-[#505f76]">
      {children}
    </span>
  );
}
