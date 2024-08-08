import {SubCategory} from "./type.dto";

export class Product {
  id!: number;
  productType!: string;
  name!: string;
  price!: number;
  description!: string;
  image!: string | null;
  pcType?: SubCategory;
  pcPartType?: SubCategory;
  peripheralType?: SubCategory;
  softwareType?: SubCategory;
  usedState?: string;
  warrantyLength?: number;
  manufacturerName?: string;
  manufacturerCatalogueNumber?: string;
  linkToPartOnManufacturerWebsite?: string | null;
}
