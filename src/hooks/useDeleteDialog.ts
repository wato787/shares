import { useState } from 'react';

export const useDeleteDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const openDialog = (itemId: string) => {
    setSelectedItemId(itemId);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedItemId(null);
  };

  return {
    isDialogOpen,
    selectedItemId,
    openDialog,
    closeDialog,
  };
};
