import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { analyzePrice } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface PriceAnalyzerProps {
  productId: string;
}

export const PriceAnalyzer = ({ productId }: PriceAnalyzerProps) => {
  const [priceToAnalyze, setPriceToAnalyze] = useState("");
  const [analysis, setAnalysis] = useState<{
    current_price: number;
    historical_average: number;
    is_fake_promotion: boolean;
  } | null>(null);

  const mutation = useMutation({
    mutationFn: ({ productId, price }: { productId: string; price: number }) =>
      analyzePrice(productId, price),
    onSuccess: (data) => {
      setAnalysis({
        current_price: data.current_price,
        historical_average: data.historical_average,
        is_fake_promotion: data.is_fake_promotion,
      });
      toast.success("Análise concluída!");
    },
    onError: () => {
      toast.error("Erro ao analisar preço");
    },
  });

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!priceToAnalyze) {
      toast.error("Digite um preço para analisar");
      return;
    }

    mutation.mutate({
      productId,
      price: parseFloat(priceToAnalyze),
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAnalyze} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="analyzePrice">Preço para Análise</Label>
          <Input
            id="analyzePrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="Digite o preço..."
            value={priceToAnalyze}
            onChange={(e) => setPriceToAnalyze(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Analisando..." : "Analisar Preço"}
        </Button>
      </form>

      {analysis && (
        <div className="space-y-3 p-4 bg-secondary/50 rounded-lg border animate-in">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Preço Analisado:</span>
            <span className="font-bold text-lg">R$ {analysis.current_price.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Média Histórica:</span>
            <span className="font-medium">R$ {analysis.historical_average.toFixed(2)}</span>
          </div>

          <div className="pt-2 border-t">
            {analysis.is_fake_promotion ? (
              <div className="flex items-center gap-2 p-3 bg-destructive-light rounded-lg border border-destructive">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <div>
                  <Badge className="bg-destructive text-destructive-foreground mb-1">
                    Promoção Falsa
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    O preço está acima ou próximo da média histórica
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-success-light rounded-lg border border-success">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <div>
                  <Badge className="bg-success text-success-foreground mb-1">
                    Promoção Real
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    O preço está significativamente abaixo da média histórica
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
