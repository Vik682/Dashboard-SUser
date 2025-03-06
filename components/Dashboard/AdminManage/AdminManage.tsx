// AdminManage.tsx
"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Search icon for search bar
import ProfileWindow from "./ShowBox"; // Import ProfileWindow
import SearchAndPagination from "./SearchAndPagination"; // Import your SearchAndPagination component
import { sampleUsers } from "@/app/api/data/data";

const AdminManage = () => {
  const [users, setUsers] = useState<any[]>([]); // Users data
  const [selectedUser, setSelectedUser] = useState<any | null>(null); // Selected user for profile details
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [itemsPerPage, setItemPerPage] = useState<number>(5); // Default items per page
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term for filtering
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false); // State for Add modal

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        setUsers(sampleUsers); // Use the sample data
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle user selection
  const handleUserClick = (user: any) => {
    setSelectedUser(user); // Set the clicked user's profile
  };

  // Render user details modal
  const renderUserDetails = () => {
    return (
      <ProfileWindow
        title={selectedUser.name}
        children={<div>{/* Render user details here */}</div>}
        onClose={() => {
          setSelectedUser(null);
        }}
      />
    );
  };
  // Handle Add button click
  const handleAdd = () => {
    setIsAddModalOpen(true); // Open the Add modal
  };

  // Render Add modal
  const renderAddModal = () => {
    return (
      <ProfileWindow
        title="Add New User"
        children={<div>{/* Render form or content for adding a new user here */}</div>}
        onClose={() => {
          setIsAddModalOpen(false);
        }}
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
          <div className="ml-2 p-2 bg-blue-500 text-white rounded-md">
            <FaSearch />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleAdd}
            className="p-2 bg-green-500 text-white rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      {/* Search and Pagination Component */}
      <SearchAndPagination
        initialItemsPerPage={itemsPerPage}
        items={filteredUsers}
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

      {/* Add New User Modal */}
      {isAddModalOpen && renderAddModal()}
    </div>
  );
};

export default AdminManage;