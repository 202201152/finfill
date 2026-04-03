import { useState } from 'react';
import ProVersionCard from '../../../components/ProVersionCard';

export default function FeaturePromoCard() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return <ProVersionCard onClose={() => setVisible(false)} />;
}

