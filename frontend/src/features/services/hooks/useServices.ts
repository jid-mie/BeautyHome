import { useQuery } from '@tanstack/react-query';
import { serviceApi } from '../api/serviceApi';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => serviceApi.getServices(),
  });
};

export const useService = (id: string | number) => {
  return useQuery({
    queryKey: ['service', id],
    queryFn: () => serviceApi.getServiceById(id),
    enabled: !!id,
  });
};
