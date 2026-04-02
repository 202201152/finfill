import { Card } from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { category: 'Food', 'This Month': 450, 'Last Month': 380 },
  { category: 'Transport', 'This Month': 150, 'Last Month': 180 },
  { category: 'Shopping', 'This Month': 320, 'Last Month': 410 },
  { category: 'Entertainment', 'This Month': 120, 'Last Month': 90 },
  { category: 'Health', 'This Month': 80, 'Last Month': 85 },
];

export default function MonthComparisonChart() {
  return (
    <Card className="p-6 h-full min-h-[350px] flex flex-col">
      <h3 className="text-[var(--color-text-secondary)] font-medium text-sm mb-6">Spending: This Month vs Last Month</h3>
      <div className="flex-1 w-full -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-tertiary)' }} dx={-10} />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-card)' }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
            <Bar dataKey="Last Month" fill="#E5E7EB" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="This Month" fill="var(--color-sage)" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
