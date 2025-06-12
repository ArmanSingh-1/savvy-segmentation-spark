
import DashboardNav from '@/components/DashboardNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Trash2, Eye } from 'lucide-react';

const DataManagement = () => {
  // Mock data for uploaded files
  const uploadedFiles = [
    {
      id: 1,
      name: "customer_data_2024.csv",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      status: "processed",
      rows: 1250
    },
    {
      id: 2,
      name: "sales_transactions.csv",
      size: "1.8 MB",
      uploadDate: "2024-01-10",
      status: "processing",
      rows: 890
    },
    {
      id: 3,
      name: "user_behavior.csv",
      size: "3.1 MB",
      uploadDate: "2024-01-08",
      status: "processed",
      rows: 2100
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <DashboardNav />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Data Management</h2>
          <p className="text-gray-600">Manage your uploaded datasets and view data status</p>
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Uploaded Datasets</CardTitle>
            <CardDescription>View and manage your CSV files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg bg-white/50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">{file.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {file.size} • {file.rows} rows • Uploaded {file.uploadDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant={file.status === 'processed' ? 'default' : 'secondary'}>
                      {file.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataManagement;
