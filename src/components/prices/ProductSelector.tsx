import { Product } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";

interface ProductSelectorProps {
  products: Product[];
  selectedProductId: string | null;
  onSelect: (productId: string) => void;
}

export const ProductSelector = ({
  products,
  selectedProductId,
  onSelect,
}: ProductSelectorProps) => {
  const selectedProduct = products.find((p) => p._id === selectedProductId);

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1 space-y-2 w-full">
          <label className="text-sm font-medium">Selecione um Produto</label>
          <Select value={selectedProductId || ""} onValueChange={onSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Escolha um produto para analisar..." />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product._id} value={product._id}>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>{product.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({product.category})
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedProduct && (
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{selectedProduct.name}</p>
              <p className="text-xs text-muted-foreground">{selectedProduct.category}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
