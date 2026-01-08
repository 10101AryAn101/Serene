import { create } from 'zustand';

// Generate random user identity
const generateUser = () => {
  const names = ['Alex', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Taylor', 'Quinn', 'Skyler', 'Jamie', 'Avery'];
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e', '#6c7a89', '#00b894'];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return { name, color };
};

export const useAppStore = create((set) => {
  const initialUser = generateUser();
  
  return {
    // User state
    user: initialUser,
    
    // Modal state
    selectedImageId: null,
    isModalOpen: false,
    
    // Actions
    setSelectedImageId: (imageId) =>
      set({ selectedImageId: imageId, isModalOpen: !!imageId }),
    
    closeModal: () =>
      set({ selectedImageId: null, isModalOpen: false }),
    
    openModal: (imageId) =>
      set({ selectedImageId: imageId, isModalOpen: true }),
    
    // Re-generate user (for testing purposes)
    regenerateUser: () =>
      set({ user: generateUser() }),
  };
});
