export interface Service {
  service_id: number;
  service_name: string;
  category_id: number;
  price: number;
  description: string;
  image: string;
  status: number;
  category?: {
    category_id: number;
    category_name: string;
  };
}

export interface ServiceResponse {
  success: boolean;
  data: Service[];
}
