import { Card } from '../../../components/ui/Card';

export default function AccentVisaCard() {
  return (
    <Card className="bg-[var(--color-sage-accent)] p-6 h-full min-h-[220px] flex flex-col justify-between text-gray-900 border-none">
      <div className="flex justify-between items-start">
        <div className="font-bold text-xl italic tracking-tighter">VISA</div>
        <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-md">
          <div className="w-3 h-3 rounded-full bg-gray-900"></div>
        </div>
      </div>
      
      <div>
        <div className="text-sm font-medium opacity-80 mb-1">Available Balance</div>
        <div className="text-3xl font-bold tracking-tight">$390.00</div>
      </div>
    </Card>
  );
}
