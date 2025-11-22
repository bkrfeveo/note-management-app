import React, { createContext, useContext, useState } from 'react';

const EditContext = createContext();

export const useEdit = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error('useEdit must be used within an EditProvider');
  }
  return context;
};

export const EditProvider = ({ children }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = (item) => {
    setIsEditing(true);
    setEditingItem(item);
    // console.log("Note context : ",item);
  };

  const stopEditing = () => {
    setEditingItem(null);
    setIsEditing(false);
  };

  const value = {
    editingItem,
    isEditing,
    startEditing,
    stopEditing
  };

  return (
    <EditContext.Provider value={value}>
      {children}
    </EditContext.Provider>
  );
};