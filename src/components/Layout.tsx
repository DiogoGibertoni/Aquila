import { Link, useLocation } from "react-router-dom";
import { Package, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">🦅</span>
              </div>
              <h1 className="text-xl font-bold">Aquila</h1>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Price Intelligence
              </span>
            </div>

            <nav className="flex gap-1">
              <Link
                to="/products"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                  isActive("/products")
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-secondary"
                )}
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Produtos</span>
              </Link>
              <Link
                to="/prices"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                  isActive("/prices")
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-secondary"
                )}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Análise</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="border-t py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Sistema Aquila - Monitoramento Inteligente de Preços
        </div>
      </footer>
    </div>
  );
};
