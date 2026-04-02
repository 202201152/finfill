import { Card } from '../../components/ui/Card';

const categories = [
  { name: 'Food & Dining', amount: 450, total: 1000, color: 'var(--color-sage)' },
  { name: 'Shopping', amount: 320, total: 1000, color: 'var(--color-sage-accent)' },
  { name: 'Transport', amount: 150, total: 1000, color: '#9CA3AF' },
  { name: 'Entertain.', amount: 120, total: 1000, color: '#D1D5DB' },
];

export default function CategoryProgressBars() {
  return (
    <Card className="p-6">
      <h3 className="text-[var(--color-text-secondary)] font-medium text-sm mb-6">Top Categories</h3>
      
      <div className="space-y-5">
        {categories.map(cat => (
          <div key={cat.name}>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-800">{cat.name}</span>
              <span className="text-[var(--color-text-secondary)] font-medium">${cat.amount}</span>
            </div>
            {/* Glass track */}
            <div className="w-full h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden backdrop-blur-sm relative">
              <div 
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${(cat.amount / cat.total) * 100}%`,
                  backgroundColor: cat.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
