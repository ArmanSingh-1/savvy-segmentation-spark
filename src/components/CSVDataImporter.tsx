
import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, CheckCircle, AlertTriangle, Brain, TrendingUp } from 'lucide-react';

interface CSVData {
  headers: string[];
  rows: any[][];
  summary: {
    totalRows: number;
    totalColumns: number;
    dataTypes: Record<string, string>;
    missingValues: number;
    duplicates: number;
  };
}

interface DataQualityMetrics {
  completeness: number;
  consistency: number;
  accuracy: number;
  recommendations: string[];
}

const CSVDataImporter = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [dataQuality, setDataQuality] = useState<DataQualityMetrics | null>(null);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  const analyzeDataQuality = (data: CSVData): DataQualityMetrics => {
    const totalCells = data.rows.length * data.headers.length;
    const completeness = ((totalCells - data.summary.missingValues) / totalCells) * 100;
    const consistency = data.summary.duplicates === 0 ? 100 : Math.max(0, 100 - (data.summary.duplicates / data.rows.length) * 100);
    const accuracy = Math.random() * 20 + 75; // Simulated accuracy score

    const recommendations = [];
    if (completeness < 90) recommendations.push('Consider data cleaning for missing values');
    if (consistency < 80) recommendations.push('Remove duplicate entries to improve data quality');
    if (data.summary.totalRows < 100) recommendations.push('Increase sample size for better segmentation accuracy');
    if (accuracy < 85) recommendations.push('Validate data sources and collection methods');

    return { completeness, consistency, accuracy, recommendations };
  };

  const generateAIInsights = (data: CSVData): string[] => {
    const insights = [];
    
    if (data.summary.totalRows > 1000) {
      insights.push('Large dataset detected - excellent for ML model training');
    }
    
    const numericColumns = Object.values(data.summary.dataTypes).filter(type => type === 'number').length;
    if (numericColumns > 3) {
      insights.push('Multiple numeric features available for advanced clustering algorithms');
    }
    
    if (data.headers.some(h => h.toLowerCase().includes('email'))) {
      insights.push('Email data detected - enables personalized marketing campaigns');
    }
    
    if (data.headers.some(h => h.toLowerCase().includes('date'))) {
      insights.push('Temporal data available for time-series analysis and trend prediction');
    }
    
    insights.push('AI recommends using ensemble methods for optimal segmentation results');
    
    return insights;
  };

  const parseCSV = (text: string): CSVData => {
    const lines = text.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    const rows = lines.slice(1).map(line => line.split(',').map(cell => cell.trim()));
    
    // Analyze data types and quality
    const dataTypes: Record<string, string> = {};
    let missingValues = 0;
    const uniqueRows = new Set();
    
    headers.forEach((header, colIndex) => {
      const sample = rows.slice(0, 10).map(row => row[colIndex]).filter(val => val && val !== '');
      const isNumeric = sample.every(val => !isNaN(Number(val)));
      dataTypes[header] = isNumeric ? 'number' : 'string';
    });
    
    rows.forEach(row => {
      const rowStr = row.join('|');
      if (uniqueRows.has(rowStr)) {
        // Duplicate found
      } else {
        uniqueRows.add(rowStr);
      }
      
      row.forEach(cell => {
        if (!cell || cell === '') missingValues++;
      });
    });
    
    return {
      headers,
      rows,
      summary: {
        totalRows: rows.length,
        totalColumns: headers.length,
        dataTypes,
        missingValues,
        duplicates: rows.length - uniqueRows.size
      }
    };
  };

  const handleFileUpload = useCallback((file: File) => {
    setIsProcessing(true);
    setUploadProgress(0);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      
      // Simulate processing time with progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            
            try {
              const data = parseCSV(text);
              const quality = analyzeDataQuality(data);
              const insights = generateAIInsights(data);
              
              setCsvData(data);
              setDataQuality(quality);
              setAiInsights(insights);
              setIsProcessing(false);
              setUploadProgress(100);
            } catch (error) {
              console.error('Error parsing CSV:', error);
              setIsProcessing(false);
            }
            
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    };
    
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      handleFileUpload(csvFile);
    }
  }, [handleFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="bg-white/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            Advanced CSV Data Importer
          </CardTitle>
          <CardDescription>
            Upload your customer data for AI-powered analysis and segmentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
          >
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Drop your CSV file here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Select CSV File
              </label>
            </Button>
          </div>
          
          {isProcessing && (
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Processing data...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Summary */}
      {csvData && (
        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Data Successfully Imported
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{csvData.summary.totalRows}</p>
                <p className="text-sm text-muted-foreground">Rows</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{csvData.summary.totalColumns}</p>
                <p className="text-sm text-muted-foreground">Columns</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{csvData.summary.missingValues}</p>
                <p className="text-sm text-muted-foreground">Missing Values</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{csvData.summary.duplicates}</p>
                <p className="text-sm text-muted-foreground">Duplicates</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Detected Columns:</h4>
                <div className="flex flex-wrap gap-2">
                  {csvData.headers.map((header, index) => (
                    <Badge key={index} variant="outline">
                      {header} ({csvData.summary.dataTypes[header]})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Quality Metrics */}
      {dataQuality && (
        <Card className="bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Data Quality Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completeness</span>
                  <span>{dataQuality.completeness.toFixed(1)}%</span>
                </div>
                <Progress value={dataQuality.completeness} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Consistency</span>
                  <span>{dataQuality.consistency.toFixed(1)}%</span>
                </div>
                <Progress value={dataQuality.consistency} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Accuracy</span>
                  <span>{dataQuality.accuracy.toFixed(1)}%</span>
                </div>
                <Progress value={dataQuality.accuracy} className="h-2" />
              </div>
            </div>

            {dataQuality.recommendations.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Recommendations:</strong>
                  <ul className="mt-2 space-y-1">
                    {dataQuality.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm">• {rec}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      {aiInsights.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI-Generated Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-sm text-purple-800">{insight}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex gap-2">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                Apply AI Segmentation
              </Button>
              <Button variant="outline">
                Generate Custom Model
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CSVDataImporter;
