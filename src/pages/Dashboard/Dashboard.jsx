import FeaturePromoCard from './cards/FeaturePromoCard';
import ActivityChartCard from './cards/ActivityChartCard';
import VirtualCards from './cards/VirtualCards';
import AccentVisaCard from './cards/AccentVisaCard';
import TotalSpentCard from './cards/TotalSpentCard';
import ContractTypeCard from './cards/ContractTypeCard';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 xl:pb-0 animate-in fade-in duration-500">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeaturePromoCard />
          <ActivityChartCard />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TotalSpentCard />
          <ContractTypeCard />
        </div>
      </div>
      
      {/* Sidebar Column */}
      <div className="space-y-6">
        <VirtualCards />
        <AccentVisaCard />
      </div>
    </div>
  );
}
