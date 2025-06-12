
import DashboardNav from '@/components/DashboardNav';
import CSVDataImporter from '@/components/CSVDataImporter';

const Upload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <DashboardNav />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Data</h2>
          <p className="text-gray-600">Import CSV files to start analyzing your customer data</p>
        </div>
        <CSVDataImporter />
      </div>
    </div>
  );
};

export default Upload;
