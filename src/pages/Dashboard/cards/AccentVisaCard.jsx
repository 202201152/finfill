import { Card } from '../../../components/ui/Card';
import { ChevronRight } from 'lucide-react';

export default function AccentVisaCard() {
  return (
    <Card className="bg-[var(--color-sage-accent)] p-6 h-full min-h-[260px] flex flex-col justify-between text-gray-900 border-none relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div className="font-bold text-2xl tracking-tighter">VISA</div>
        <button className="w-6 h-6 flex items-center justify-center text-gray-900">
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="mt-auto pt-16">
        <div className="text-4xl font-bold tracking-tight mb-2">$390.00</div>
        
        <div className="flex justify-between items-end mt-4 text-xs font-semibold text-gray-700">
          <div className="tracking-widest flex gap-2">
            <span>****</span>
            <span>4852</span>
          </div>
          <div>09 / 28</div>
        </div>
      </div>
    </Card>
  );
}
