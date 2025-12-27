import type { Brand } from "./Brand";
import type { Supplement } from "./Supplement";

export interface SearchResults {
  brands: Brand[];
  supplements: Supplement[];
}