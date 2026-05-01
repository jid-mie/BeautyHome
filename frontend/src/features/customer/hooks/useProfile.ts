import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerApi } from '../api/customerApi';
import { UpdateProfileRequest } from '../types';
import { useAppDispatch } from '../../../app/store';
import { fetchCurrentUser } from '../../auth/authSlice';

export const useProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => customerApi.getProfile(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileRequest) => customerApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => customerApi.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      dispatch(fetchCurrentUser());
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    uploadAvatar: uploadAvatarMutation.mutate,
    isUploadingAvatar: uploadAvatarMutation.isPending,
  };
};
