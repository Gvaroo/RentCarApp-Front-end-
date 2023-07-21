import { GetBrandDTO } from './GetBrandDTO';
import { GetModelDTO } from './GetModelDTO';
import { RentCarDTO } from './RentCarDTO';

export interface GetRentedCarDTO {
  name: string;
  city: string;
  brand: GetBrandDTO;
  model: GetModelDTO;
  rentedCar: RentCarDTO;
}
