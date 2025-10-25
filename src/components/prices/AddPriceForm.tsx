import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPrice } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface AddPriceFormProps {
  productId: string;
}

export const AddPriceForm = ({ productId }: AddPriceFormProps) => {
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [isPromotion, setIsPromotion] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPrice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-complete", productId] });
      toast.success("✅ Preço registrado via evento!");
      setPrice("");
      setOriginalPrice("");
      setIsPromotion(false);
    },
    onError: () => {
      toast.error("Erro ao adicionar preço");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!price || !originalPrice) {
      toast.error("Preencha todos os campos");
      return;
    }

    mutation.mutate({
      product_id: productId,
      price: parseFloat(price),
      original_price: parseFloat(originalPrice),
      is_promotion: isPromotion,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Preço Atual *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="originalPrice">Preço Original *</Label>
          <Input
            id="originalPrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
        <div>
          <Label htmlFor="promotion" className="cursor-pointer">
            Está em promoção?
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Ative se o produto estiver em desconto
          </p>
        </div>
        <Switch
          id="promotion"
          checked={isPromotion}
          onCheckedChange={setIsPromotion}
        />
      </div>

      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Adicionando..." : "Adicionar Preço"}
      </Button>
    </form>
  );
};
