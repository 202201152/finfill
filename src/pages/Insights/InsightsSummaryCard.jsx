import { Card } from '../../components/ui/Card';
import { Lightbulb } from 'lucide-react';

export default function InsightsSummaryCard() {
  return (
    <Card className="p-5 border-l-[3px] border-l-[var(--color-sage)] border-t-0 border-r-0 border-b-0 rounded-l-none bg-white">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-[var(--color-acid)] rounded-full text-gray-900 shrink-0 mt-0.5">
          <Lightbulb size={18} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">Smart Insight</h4>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Your food expenses are <strong className="text-gray-900 font-medium">18% higher</strong> this month. Consider cutting back on dining out to stay within your $500 monthly budget goal.
          </p>
        </div>
      </div>
    </Card>
  );
}
