import React from "react";

const AdminPage = () => {
  return (
    <div className="min-h-screen rounded flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="text-center bg-white/10 backdrop-blur-md p-12 rounded-lg shadow-2xl animate-fade-in">
        <h1 className="text-5xl font-bold uppercase text-white tracking-wider animate-slide-in">
          Welcome to Admin Dashboard
        </h1>
      </div>
    </div>
  );
};

export default AdminPage;
