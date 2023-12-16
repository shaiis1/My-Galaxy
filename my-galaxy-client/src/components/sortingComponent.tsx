import React, { useState, useEffect } from 'react';

type SortingComponentProps<T> = {
  data: T[];
  sortKey: keyof T;
  children: (sortedData: T[], toggleSortDirection: () => void, sortDirection: 'asc' | 'desc') => React.ReactNode;
};

function SortingComponent<T>({ data, sortKey, children }: SortingComponentProps<T>): JSX.Element {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState<T[]>([]);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return 0;
    });

    setSortedData(sorted);
  }, [data, sortKey, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
  };

  return <>{children(sortedData, toggleSortDirection, sortDirection)}</>;
}

export default SortingComponent;
