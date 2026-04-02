import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Diamond } from 'lucide-react';

export default function FeaturePromoCard() {
  return (
    <Card className="bg-[var(--color-lavender)] p-6 relative overflow-hidden flex flex-col justify-between h-full min-h-[220px]">
      <div className="z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center backdrop-blur-sm shadow-sm ring-1 ring-white/50">
            <Diamond className="text-purple-600 drop-shadow-md" size={20} />
          </div>
          <span className="font-semibold text-gray-800 bg-white/50 px-2 py-0.5 rounded-full text-xs">
            Pro Version
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-1">Unlock Premium</h3>
        <p className="text-sm text-gray-700 max-w-[200px]">Get advanced analytics and unlimited virtual cards.</p>
        
        <div className="mt-6">
          <Button variant="pill" size="sm" className="px-5">Upgrade Now</Button>
        </div>
      </div>
      
      {/* Abstract Sparkline / Wave */}
      <div className="absolute -bottom-6 -right-6 w-48 h-32 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 100" className="w-full h-full fill-purple-900">
          <path d="M0,50 C40,80 80,20 120,40 C160,60 180,30 200,50 L200,100 L0,100 Z" />
        </svg>
      </div>
    </Card>
  );
}
