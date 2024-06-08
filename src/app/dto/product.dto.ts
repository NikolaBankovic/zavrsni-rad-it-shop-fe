export class Product {
  id!: number;
  productType!: string;
  name!: string;
  price!: number;
  description!: string;
  image!: string | null;
  pcType?: string;
  pcPartType?: string;
  peripheralType?: string;
  softwareType?: string;
  usedState?: string;
  warrantyLength?: number;
  manufacturerName?: string;
  manufacturerCatalogueNumber?: string;
  linkToPartOnManufacturerWebsite?: string | null;
}
