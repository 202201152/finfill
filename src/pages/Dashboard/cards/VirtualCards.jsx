import { Card } from '../../../components/ui/Card';

export default function VirtualCards() {
  return (
    <Card className="p-6 h-full min-h-[220px] flex flex-col justify-between">
      <div>
        <h3 className="text-[var(--color-text-secondary)] font-medium text-sm mb-4">Total Balance</h3>
        <div className="text-3xl font-bold tracking-tight mb-6">$6,010.29</div>
        
        {/* Progress Bars */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span>Dollar</span>
              <span className="text-[var(--color-text-secondary)]">72%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-sage)] rounded-full transition-all duration-1000 ease-out w-[72%]"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span>Tether</span>
              <span className="text-[var(--color-text-secondary)]">28%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-sage)] rounded-full transition-all duration-1000 ease-out opacity-60 w-[28%]"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-end border-t border-[var(--color-border-color)] pt-4">
        <div className="text-xs text-[var(--color-text-secondary)] font-mono tracking-widest text-[10px]">
          •••• •••• •••• 4291
        </div>
        <div className="text-xs text-[var(--color-text-secondary)] font-mono">
          12/26
        </div>
      </div>
    </Card>
  );
}
