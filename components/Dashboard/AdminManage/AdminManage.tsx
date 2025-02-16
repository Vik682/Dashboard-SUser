// AdminManage.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'; // Search icon for search bar
import ProfileWindow from './ShowBox.tsx'; // Import ProfileWindow
import SearchAndPagination from './SearchAndPagination'; // Import your SearchAndPagination component

const AdminManage = () => {
  const [users, setUsers] = useState<unknown[]>([]); // Users data
  const [selectedUser, setSelectedUser] = useState<unknown | null>(null); // Selected user for profile details
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [itemsPerPage] = useState<number>(10); // Default items per page
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term for filtering

  const sampleUsers = [
    { id: 1, name: "John Doe", email: "johndoe@example.com"},
    { id: 2, name: "Jane Smith", email: "janesmith@example.com"},
    { id: 3, name: "Samuel Green", email: "samuelgreen@example.com" },
    { id: 4, name: "Lucy Brown", email: "lucybrown@example.com" },
    { id: 5, name: "Michael White", email: "michaelwhite@example.com" },
    { id: 6, name: "Emily Black", email: "emilyblack@example.com" },
    { id: 7, name: "Daniel Yellow", email: "danielyellow@example.com" },
    { id: 8, name: "Chris Blue", email: "chrisblue@example.com" },
    { id: 9, name: "Patricia Red", email: "patriciared@example.com" },
    { id: 10, name: "George Pink", email: "georgepink@example.com"},
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        setUsers(sampleUsers); // Use the sample data
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle user selection
  const handleUserClick = (user: unknown) => {
    setSelectedUser(user); // Set the clicked user's profile
  };

  // Render user details modal
  const renderUserDetails = () => {
    return (
      <ProfileWindow
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    );
  };

  return (
    <div>
      {/* Search bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Search by Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="ml-2 p-2 bg-blue-500 text-white rounded-md">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Search and Pagination Component */}
      <SearchAndPagination
        items={filteredUsers}
        itemsPerPage={itemsPerPage}
        onItemSelect={handleUserClick}
        renderItem={(user, index) => (
          <>
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{user.name}</td>
            <td className="border px-4 py-2">{user.email}</td>
          </>
        )}
        renderTableHeader={() => (
          <>
            <th className="border px-4 py-2">Admin Id</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
          </>
        )}
      />

      {/* User Profile Details */}
      {selectedUser && renderUserDetails()}
    </div>
  );
};

export default AdminManage;