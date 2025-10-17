import { DashboardOverview } from '@/app/features/dashboard/components/DashboardOverview';
import { QuickActions } from '@/app/features/dashboard/components/QuickActions';
import { MainContent } from '@/app/ui/components/layout/MainContent';

export default function DashboardPage() {
  return (
    <>
      <MainContent title="Resumen">
        <div className="space-y-6">
          <DashboardOverview />
          <QuickActions />
        </div>
      </MainContent>
    </>
  );
}
