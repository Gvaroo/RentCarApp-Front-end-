export interface AddCarDTO {
  name: string;
  year: number;
  price: number;
  city: string;
  capacity: number;
  fuelCapacity: number;
  createdBy: string;
  brandId: number;
  modelId: number;
  transmissionId: number;
  images: string[];
}
