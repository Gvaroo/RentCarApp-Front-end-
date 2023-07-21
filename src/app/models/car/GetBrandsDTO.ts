import { GetModelDTO } from './GetModelDTO';

export interface GetBrandsDTO {
  id: number;
  name: string;
  models: GetModelDTO[];
}
