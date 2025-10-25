import { useQuery } from "@tanstack/react-query";
import { getProductComplete } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, MinusCircle } from "lucide-react";

interface PriceHistoryProps {
  productId: string;
}

export const PriceHistory = ({ productId }: PriceHistoryProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product-complete", productId],
    queryFn: () => getProductComplete(productId),
    enabled: !!productId,
  });

  if (isLoading) {
    return <div className="h-40 bg-muted animate-pulse rounded" />;
  }

  if (!data || data.prices.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum histórico de preços disponível
      </div>
    );
  }

  const sortedPrices = [...data.prices].sort(
    (a, b) => new Date(b.scraped_at).getTime() - new Date(a.scraped_at).getTime()
  );

  const getPromotionBadge = (price: typeof sortedPrices[0]) => {
    if (!price.is_promotion) {
      return (
        <Badge variant="secondary" className="gap-1">
          <MinusCircle className="w-3 h-3" />
          Normal
        </Badge>
      );
    }

    if (price.is_fake_promotion) {
      return (
        <Badge className="gap-1 bg-destructive text-destructive-foreground">
          <XCircle className="w-3 h-3" />
          Falsa
        </Badge>
      );
    }

    return (
      <Badge className="gap-1 bg-success text-success-foreground">
        <CheckCircle className="w-3 h-3" />
        Real
      </Badge>
    );
  };

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Preço Atual</TableHead>
            <TableHead>Preço Original</TableHead>
            <TableHead>Desconto</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPrices.map((price) => {
            const discount =
              price.is_promotion
                ? ((price.original_price - price.price) / price.original_price) * 100
                : 0;

            return (
              <TableRow key={price.id}>
                <TableCell className="font-medium">
                  {new Date(price.scraped_at).toLocaleString("pt-BR")}
                </TableCell>
                <TableCell className="font-bold text-primary">
                  R$ {price.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  R$ {price.original_price.toFixed(2)}
                </TableCell>
                <TableCell>
                  {discount > 0 ? (
                    <span className="text-success font-medium">
                      -{discount.toFixed(0)}%
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>{getPromotionBadge(price)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
