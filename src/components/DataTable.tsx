import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import { User } from '../types';
import ColumnToggle from './ColumnToggle';
import ModalForm from './ModalForm';

const DataTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['id', 'name', 'email', 'role']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchData = async () => {
    const params = {
      _page: page,
      _limit: 5,
      _sort: sortField,
      _order: sortOrder,
      q: query,
    };
    try {
      const response = await getUsers(params);
      if(query){
        const filteredUsers = response.data.filter(user =>
        Object.values(user)
          .some(val => val.toLowerCase().includes(query.toLowerCase()))
        );

        setUsers(filteredUsers);
      }else{
         setUsers(response.data);
      }
     
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, sortField, sortOrder, page]);

  const handleCreate = async (data: Omit<User, 'id'>) => {
    await createUser(data);
    fetchData();
  };

  const handleUpdate = async (data: Omit<User, 'id'>) => {
    if (editingUser) {
      await updateUser(editingUser.id, data);
      fetchData();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      fetchData();
    }
  };

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="border px-2 py-1"
        />
        <button onClick={() => { setEditingUser(null); setIsModalOpen(true); }} className="bg-green-600 text-white px-3 py-1 rounded">
          + Add User
        </button>
      </div>

      <ColumnToggle
        columns={["id", "name", "email", "role"]}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
      />

      <table className="w-full border mt-3">
        <thead>
          <tr>
            {visibleColumns.includes("id") && <th onClick={() => setSortField("id")}>ID</th>}
            {visibleColumns.includes("name") && <th onClick={() => setSortField("name")}>Name</th>}
            {visibleColumns.includes("email") && <th onClick={() => setSortField("email")}>Email</th>}
            {visibleColumns.includes("role") && <th onClick={() => setSortField("role")}>Role</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {visibleColumns.includes("id") && <td>{user.id}</td>}
              {visibleColumns.includes("name") && <td>{user.name}</td>}
              {visibleColumns.includes("email") && <td>{user.email}</td>}
              {visibleColumns.includes("role") && <td>{user.role}</td>}
              <td>
                <button onClick={() => { setEditingUser(user); setIsModalOpen(true); }} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="text-red-600 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-3">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="border px-3 py-1 rounded">Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)} className="border px-3 py-1 rounded">Next</button>
      </div>

      <ModalForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingUser ? handleUpdate : handleCreate}
        initialData={editingUser}
      />
    </div>
  );
};

export default DataTable;