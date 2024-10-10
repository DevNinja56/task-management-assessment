import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import axios from "axios";

const AssignDropDown = ({ onSelect }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (user) => {
    const alreadySelected = selectedUsers.includes(user._id);
    const newSelectedUsers = alreadySelected
      ? selectedUsers.filter((id) => id !== user._id)
      : [...selectedUsers, user._id];

    setSelectedUsers(newSelectedUsers);
    onSelect(newSelectedUsers);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-9 left-0 bg-white rounded-lg w-[200px] md:w-[273px] border border-lightBlue/20 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-3 px-2 md:px-5 flex items-center gap-2.5 border-b border-lightBlue/20 w-full">
        <CiSearch />
        <input
          className="outline-none text-xs md:text-sm font-light lexend-deca-font text-lightBlue"
          placeholder="Search or enter email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="px-2.5 pt-4 pb-5 flex flex-col gap-2.5 w-full">
        {filteredUsers.map((user) => (
          <div
            key={"user--" + user._id}
            onClick={() => toggleUserSelection(user)} // Toggle user selection
            className={`bg-lightBlue/15 px-2.5 py-1.5 flex items-center gap-1.5 w-full rounded-md relative group cursor-pointer ${
              selectedUsers.includes(user._id) ? "bg-lightBlue/25" : ""
            }`} // Highlight selected
          >
            <Image
              height={26}
              width={26}
              src="/images/default-user.png"
              className="border border-white rounded-full h-5 w-5 md:h-auto md:w-auto"
              alt="assign-user-image"
            />
            <h2 className="font-light text-xs md:text-sm lexend-deca-font text-lightBlue">
              {user.name}
            </h2>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AssignDropDown;
