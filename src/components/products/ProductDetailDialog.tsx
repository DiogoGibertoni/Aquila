import { Product } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

interface ProductDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export const ProductDetailDialog = ({
  open,
  onOpenChange,
  product,
}: ProductDetailDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">{product.name}</DialogTitle>
              <Badge variant="secondary" className="mt-1">
                {product.category}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {product.description && (
            <div>
              <h4 className="text-sm font-medium mb-2">Descrição</h4>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">ID do Produto</h4>
              <p className="text-sm text-muted-foreground font-mono">{product._id}</p>
            </div>

            {product.external_id && (
              <div>
                <h4 className="text-sm font-medium mb-1">ID Externo</h4>
                <p className="text-sm text-muted-foreground font-mono">
                  {product.external_id}
                </p>
              </div>
            )}

            {product.site_id && (
              <div>
                <h4 className="text-sm font-medium mb-1">Site</h4>
                <p className="text-sm text-muted-foreground">{product.site_id}</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium mb-1">Criado em</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(product.created_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
