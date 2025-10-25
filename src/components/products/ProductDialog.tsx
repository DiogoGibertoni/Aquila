import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Product } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSubmit: (data: Omit<Product, "_id" | "created_at">) => void;
  isLoading: boolean;
}

export const ProductDialog = ({
  open,
  onOpenChange,
  product,
  onSubmit,
  isLoading,
}: ProductDialogProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<
    Omit<Product, "_id" | "created_at">
  >({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      external_id: "",
      site_id: "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description || "",
        category: product.category,
        external_id: product.external_id || "",
        site_id: product.site_id || "",
      });
    } else {
      reset({
        name: "",
        description: "",
        category: "",
        external_id: "",
        site_id: "",
      });
    }
  }, [product, reset, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{product ? "Editar Produto" : "Novo Produto"}</DialogTitle>
          <DialogDescription>
            {product
              ? "Atualize as informações do produto"
              : "Adicione um novo produto ao catálogo"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              {...register("name", { required: "Nome é obrigatório" })}
              placeholder="Ex: Notebook Dell Inspiron"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Input
              id="category"
              {...register("category", { required: "Categoria é obrigatória" })}
              placeholder="Ex: Eletrônicos"
            />
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descreva o produto..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="site_id">Site</Label>
              <Input
                id="site_id"
                {...register("site_id")}
                placeholder="Ex: amazon"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="external_id">ID Externo</Label>
              <Input
                id="external_id"
                {...register("external_id")}
                placeholder="Ex: DELL-001"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : product ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
