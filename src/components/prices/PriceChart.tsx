import { useQuery } from "@tanstack/react-query";
import { getProductComplete } from "@/lib/api";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

interface PriceChartProps {
  productId: string;
}

export const PriceChart = ({ productId }: PriceChartProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product-complete", productId],
    queryFn: () => getProductComplete(productId),
    enabled: !!productId,
  });

  if (isLoading) {
    return <div className="h-[300px] bg-muted animate-pulse rounded" />;
  }

  if (!data || data.prices.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        Nenhum dado de preço disponível
      </div>
    );
  }

  const chartData = [...data.prices]
    .sort((a, b) => new Date(a.scraped_at).getTime() - new Date(b.scraped_at).getTime())
    .map((price) => ({
      date: new Date(price.scraped_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      price: price.price,
      originalPrice: price.original_price,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="date"
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickFormatter={(value) => `R$ ${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
          formatter={(value: number) => [`R$ ${value.toFixed(2)}`, ""]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="price"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))", r: 4 }}
          name="Preço Atual"
        />
        <Line
          type="monotone"
          dataKey="originalPrice"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: "hsl(var(--muted-foreground))", r: 3 }}
          name="Preço Original"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
