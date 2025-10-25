import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { ProductSelector } from "@/components/prices/ProductSelector";
import { PriceChart } from "@/components/prices/PriceChart";
import { PriceHistory } from "@/components/prices/PriceHistory";
import { PriceStats } from "@/components/prices/PriceStats";
import { AddPriceForm } from "@/components/prices/AddPriceForm";
import { PriceAnalyzer } from "@/components/prices/PriceAnalyzer";
import { TrendingUp } from "lucide-react";

const Prices = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-primary" />
          Análise de Preços
        </h2>
        <p className="text-muted-foreground mt-1">
          Monitore e analise o histórico de preços dos produtos
        </p>
      </div>

      <ProductSelector
        products={products}
        selectedProductId={selectedProductId}
        onSelect={setSelectedProductId}
      />

      {selectedProductId ? (
        <div className="space-y-6">
          <PriceStats productId={selectedProductId} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Evolução de Preços</h3>
              <PriceChart productId={selectedProductId} />
            </Card>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Adicionar Preço</h3>
                <AddPriceForm productId={selectedProductId} />
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Análise de Promoção</h3>
                <PriceAnalyzer productId={selectedProductId} />
              </Card>
            </div>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Histórico Completo</h3>
            <PriceHistory productId={selectedProductId} />
          </Card>
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Selecione um produto para visualizar análises de preço
          </p>
        </Card>
      )}
    </div>
  );
};

export default Prices;
