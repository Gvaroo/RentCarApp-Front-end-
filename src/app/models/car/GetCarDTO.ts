import { GetBrandDTO } from './GetBrandDTO';
import { GetImagesDTO } from './GetImagesDTO';
import { GetModelDTO } from './GetModelDTO';
import { GetTransmissionsDTO } from './GetTransmissionsDTO';

export interface GetCarDTO {
  id: number;
  name: string;
  year: number;
  price: number;
  city: string;
  capacity: number;
  fuelCapacity: number;
  brand: GetBrandDTO;
  model: GetModelDTO;
  transmission: GetTransmissionsDTO;
  carImages: GetImagesDTO[];
  userEmail: string;
  isRented: boolean;
}
