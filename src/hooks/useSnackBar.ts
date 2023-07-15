import { useSnackbar as useNotistackSnackbar } from 'notistack';

export const useSnackbar = (): {
  showSnackbar: (value: string, variant?: string | undefined) => void;
} => {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const showSnackbar = (value: string, variant?: any): void => {
    enqueueSnackbar(value, {
      // preventDuplicate: true,
      autoHideDuration: 2000,
      variant: variant ? variant : 'default',
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      style: {
        backgroundColor: '#55B4B7',
        color: '#fff',
        fontWeight: 'bold',
      },
    });
  };

  return { showSnackbar };
};
