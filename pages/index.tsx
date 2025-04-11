import React from 'react';
import DataTable from '../components/DataTable';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Feature-rich Data Table</h1>
      <DataTable />
    </div>
  );
};

export default Home;