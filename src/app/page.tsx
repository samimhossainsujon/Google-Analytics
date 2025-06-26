'use client';

import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { 
  CalendarDays, 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  Globe, 
  Smartphone, 
  Monitor, 
  MousePointer,
  Settings,
  Bell,
  Search,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { DatePickerWithRange } from '@/components/date-range-picker';
import { ExportButton } from '@/components/export-button';
import { RealTimeIndicator } from '@/components/real-time-indicator';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart
} from 'recharts';

const pageViewsData = [
  { date: '2024-01-01', views: 1200, sessions: 800, users: 650, bounceRate: 45.2 },
  { date: '2024-01-02', views: 1350, sessions: 900, users: 720, bounceRate: 42.1 },
  { date: '2024-01-03', views: 1100, sessions: 750, users: 600, bounceRate: 48.3 },
  { date: '2024-01-04', views: 1800, sessions: 1200, users: 950, bounceRate: 38.7 },
  { date: '2024-01-05', views: 1600, sessions: 1050, users: 850, bounceRate: 41.2 },
  { date: '2024-01-06', views: 2100, sessions: 1400, users: 1100, bounceRate: 35.8 },
  { date: '2024-01-07', views: 1900, sessions: 1250, users: 1000, bounceRate: 39.4 },
];

const trafficSourcesData = [
  { name: 'Organic Search', value: 45, color: 'hsl(var(--chart-1))' },
  { name: 'Direct', value: 25, color: 'hsl(var(--chart-2))' },
  { name: 'Social Media', value: 15, color: 'hsl(var(--chart-3))' },
  { name: 'Referral', value: 10, color: 'hsl(var(--chart-4))' },
  { name: 'Email', value: 5, color: 'hsl(var(--chart-5))' },
];

const deviceData = [
  { device: 'Desktop', sessions: 12500, percentage: 65, icon: Monitor },
  { device: 'Mobile', sessions: 5800, percentage: 30, icon: Smartphone },
  { device: 'Tablet', sessions: 960, percentage: 5, icon: Smartphone },
];

const topPagesData = [
  { page: '/', views: 8520, uniqueViews: 6240, avgTime: '2:34', bounceRate: 35.2 },
  { page: '/products', views: 5240, uniqueViews: 4120, avgTime: '3:12', bounceRate: 28.7 },
  { page: '/about', views: 3680, uniqueViews: 2890, avgTime: '1:45', bounceRate: 52.1 },
  { page: '/contact', views: 2940, uniqueViews: 2340, avgTime: '1:23', bounceRate: 48.9 },
  { page: '/blog', views: 2150, uniqueViews: 1820, avgTime: '4:21', bounceRate: 22.3 },
];

const geographicData = [
  { country: 'United States', sessions: 8420, percentage: 42, flag: '🇺🇸' },
  { country: 'United Kingdom', sessions: 3240, percentage: 16, flag: '🇬🇧' },
  { country: 'Germany', sessions: 2580, percentage: 13, flag: '🇩🇪' },
  { country: 'France', sessions: 1940, percentage: 10, flag: '🇫🇷' },
  { country: 'Canada', sessions: 1520, percentage: 8, flag: '🇨🇦' },
  { country: 'Australia', sessions: 1180, percentage: 6, flag: '🇦🇺' },
  { country: 'Others', sessions: 1120, percentage: 5, flag: '🌍' },
];

const conversionData = [
  { date: '2024-01-01', conversions: 24, conversionRate: 2.1, revenue: 2400 },
  { date: '2024-01-02', conversions: 32, conversionRate: 2.4, revenue: 3200 },
  { date: '2024-01-03', conversions: 18, conversionRate: 1.8, revenue: 1800 },
  { date: '2024-01-04', conversions: 45, conversionRate: 2.8, revenue: 4500 },
  { date: '2024-01-05', conversions: 38, conversionRate: 2.5, revenue: 3800 },
  { date: '2024-01-06', conversions: 52, conversionRate: 3.1, revenue: 5200 },
  { date: '2024-01-07', conversions: 41, conversionRate: 2.7, revenue: 4100 },
];

const realtimeData = [
  { time: '10:00', activeUsers: 234 },
  { time: '10:05', activeUsers: 267 },
  { time: '10:10', activeUsers: 245 },
  { time: '10:15', activeUsers: 289 },
  { time: '10:20', activeUsers: 312 },
  { time: '10:25', activeUsers: 298 },
  { time: '10:30', activeUsers: 276 },
];

export default function AnalyticsDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleExportPDF = () => {
    console.log('Exporting as PDF...');
  };

  const handleExportCSV = () => {
    console.log('Exporting as CSV...');
  };

  const handleExportImage = () => {
    console.log('Exporting as Image...');
  };

  const MetricCard = ({ title, value, change, icon: Icon, trend = 'up', subtitle }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gradient-to-br from-card to-card/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
        <div className={`flex items-center text-xs mt-2 ${
          trend === 'up' ? 'text-green-600 dark:text-green-400' : 
          trend === 'down' ? 'text-red-600 dark:text-red-400' : 
          'text-muted-foreground'
        }`}>
          <TrendingUp className={`h-3 w-3 mr-1 ${trend === 'down' && 'rotate-180'}`} />
          {change} from last period
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Analytics Pro</h1>
                  <p className="text-sm text-muted-foreground">Advanced Web Analytics</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <DatePickerWithRange
                date={dateRange}
                onDateChange={setDateRange}
                className="hidden md:block"
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <ExportButton
                onExportPDF={handleExportPDF}
                onExportCSV={handleExportCSV}
                onExportImage={handleExportImage}
              />
              
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              
              <ThemeToggle />
              
              <RealTimeIndicator />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value="24,563"
            change="+12.5%"
            icon={Users}
            trend="up"
            subtitle="Unique visitors"
          />
          <MetricCard
            title="Page Views"
            value="125,847"
            change="+8.2%"
            icon={Eye}
            trend="up"
            subtitle="Total page views"
          />
          <MetricCard
            title="Avg. Session Duration"
            value="2m 34s"
            change="+5.1%"
            icon={Clock}
            trend="up"
            subtitle="Time on site"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.2%"
            change="+0.8%"
            icon={Target}
            trend="up"
            subtitle="Goal completions"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="realtime" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Real-time
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Audience
            </TabsTrigger>
            <TabsTrigger value="acquisition" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Acquisition
            </TabsTrigger>
            <TabsTrigger value="behavior" className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              Behavior
            </TabsTrigger>
            <TabsTrigger value="conversions" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Conversions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Enhanced Traffic Trends */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Traffic Overview</CardTitle>
                    <CardDescription>Page views, sessions, and users over time</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={pageViewsData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis className="text-muted-foreground" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="views" 
                        fill="hsl(var(--chart-1))" 
                        fillOpacity={0.3}
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        name="Page Views"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sessions" 
                        stroke="hsl(var(--chart-2))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                        name="Sessions"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="hsl(var(--chart-3))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
                        name="Users"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Traffic Sources */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={trafficSourcesData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${value}%`}
                        >
                          {trafficSourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {trafficSourcesData.map((source, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: source.color }}
                          />
                          <span>{source.name}</span>
                        </div>
                        <span className="font-medium">{source.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Device Breakdown */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Device Category</CardTitle>
                  <CardDescription>Sessions by device type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {deviceData.map((device, index) => {
                    const IconComponent = device.icon;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{device.device}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{device.sessions.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">{device.percentage}%</div>
                          </div>
                        </div>
                        <Progress value={device.percentage} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="realtime" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-500" />
                    Active Users
                  </CardTitle>
                  <CardDescription>Users currently on your site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">247</div>
                  <div className="text-sm text-muted-foreground">Active right now</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Top Active Pages</CardTitle>
                  <CardDescription>Most viewed pages right now</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">/products</span>
                    <Badge variant="secondary">89 users</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">/</span>
                    <Badge variant="secondary">67 users</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">/blog</span>
                    <Badge variant="secondary">34 users</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Real-time acquisition</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Organic Search</span>
                    <Badge variant="secondary">112 users</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Direct</span>
                    <Badge variant="secondary">78 users</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Social</span>
                    <Badge variant="secondary">45 users</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Real-time Activity</CardTitle>
                <CardDescription>Active users over the last 30 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={realtimeData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                      <XAxis dataKey="time" className="text-muted-foreground" fontSize={12} />
                      <YAxis className="text-muted-foreground" fontSize={12} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="activeUsers" 
                        stroke="hsl(var(--chart-1))" 
                        fill="hsl(var(--chart-1))" 
                        fillOpacity={0.6}
                        name="Active Users"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Geographic Data */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Geographic Overview</CardTitle>
                  <CardDescription>Sessions by country</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {geographicData.map((country, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{country.flag}</span>
                          <span className="font-medium">{country.country}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Progress value={country.percentage} className="w-20" />
                          <div className="text-right min-w-[80px]">
                            <div className="font-semibold">{country.sessions.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">{country.percentage}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Audience Insights */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Audience Insights</CardTitle>
                  <CardDescription>Key demographic metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border">
                      <div className="text-2xl font-bold text-primary">68%</div>
                      <div className="text-sm text-muted-foreground">Returning Visitors</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border">
                      <div className="text-2xl font-bold text-secondary-foreground">32%</div>
                      <div className="text-sm text-muted-foreground">New Visitors</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Age 25-34</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Age 35-44</span>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Age 18-24</span>
                        <span className="text-sm font-medium">22%</span>
                      </div>
                      <Progress value={22} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="acquisition">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Acquisition Channels</CardTitle>
                <CardDescription>Detailed breakdown of traffic acquisition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trafficSourcesData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                      <XAxis type="number" className="text-muted-foreground" fontSize={12} />
                      <YAxis dataKey="name" type="category" width={100} className="text-muted-foreground" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages on your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPagesData.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="font-medium">{page.page}</div>
                        <div className="text-sm text-muted-foreground">
                          {page.uniqueViews.toLocaleString()} unique pageviews • Avg. time: {page.avgTime}
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="font-semibold">{page.views.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">views</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{page.bounceRate}%</div>
                          <div className="text-sm text-muted-foreground">bounce rate</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversions">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Conversion Tracking</CardTitle>
                <CardDescription>Goal completions and conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={conversionData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        className="text-muted-foreground"
                        fontSize={12}
                      />
                      <YAxis yAxisId="left" className="text-muted-foreground" fontSize={12} />
                      <YAxis yAxisId="right" orientation="right" className="text-muted-foreground" fontSize={12} />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="conversions" fill="hsl(var(--chart-2))" name="Conversions" radius={[4, 4, 0, 0]} />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="conversionRate" 
                        stroke="hsl(var(--chart-3))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
                        name="Conversion Rate (%)"
                      />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="hsl(var(--chart-1))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                        name="Revenue ($)"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}