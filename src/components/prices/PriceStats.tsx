import { useQuery } from "@tanstack/react-query";
import { getProductComplete } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, BarChart3, Hash } from "lucide-react";

interface PriceStatsProps {
  productId: string;
}

export const PriceStats = ({ productId }: PriceStatsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product-complete", productId],
    queryFn: () => getProductComplete(productId),
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (!data || data.prices.length === 0) {
    return null;
  }

  const prices = data.prices.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const count = prices.length;

  const stats = [
    {
      label: "Menor Preço",
      value: `R$ ${minPrice.toFixed(2)}`,
      icon: TrendingDown,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Maior Preço",
      value: `R$ ${maxPrice.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      label: "Preço Médio",
      value: `R$ ${avgPrice.toFixed(2)}`,
      icon: BarChart3,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Registros",
      value: count.toString(),
      icon: Hash,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
