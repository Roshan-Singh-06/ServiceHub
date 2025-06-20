import { useState, useEffect } from 'react';
import {
  UsersIcon, ShoppingBagIcon, CurrencyDollarIcon, ChartBarIcon,
  ArrowTrendingUpIcon, ArrowTrendingDownIcon, EllipsisVerticalIcon,
  CalendarIcon, ChartPieIcon, MapPinIcon, GlobeAltIcon,
  CreditCardIcon, TruckIcon, ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend,
  RadialLinearScale
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend,
  RadialLinearScale
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated loading effect
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Enhanced stats data with more metrics (ServiceHub context)
  const stats = [
    {
      name: 'Total Revenue',
      value: '₹12,45,000',
      change: '+15.2%',
      trend: 'up',
      icon: CurrencyDollarIcon,
      color: 'emerald',
      details: 'vs. last month'
    },
    {
      name: 'Active Users',
      value: '4,320',
      change: '+8.7%',
      trend: 'up',
      icon: UsersIcon,
      color: 'blue',
      details: 'current online: 112'
    },
    {
      name: 'Bookings Today',
      value: '287',
      change: '+3.1%',
      trend: 'up',
      icon: ShoppingBagIcon,
      color: 'purple',
      details: 'total this week: 1,920'
    },
    {
      name: 'Avg. Service Rating',
      value: '4.6/5',
      change: '+0.2',
      trend: 'up',
      icon: ChartBarIcon,
      color: 'orange',
      details: 'based on 2,340 reviews'
    }
  ];

  // Service bookings trend data
  const salesData = {
    labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    datasets: [
      {
        label: 'Today',
        data: [12, 34, 56, 44, 38, 22],
        borderColor: '#5c7c89',
        backgroundColor: 'rgba(92, 124, 137, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Yesterday',
        data: [10, 28, 48, 40, 30, 18],
        borderColor: '#1f4959',
        backgroundColor: 'rgba(31, 73, 89, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Revenue by service category
  const categoryData = {
    labels: [
      'Salon', 'Plumbing', 'Electrician', 'Cleaning', 'AC Repair', 'Painting', 'Other'
    ],
    datasets: [{
      data: [30, 22, 18, 15, 8, 5, 2],
      backgroundColor: [
        '#5c7c89', '#1f4959', '#06B6D4',
        '#10B981', '#F59E0B', '#EF4444', '#6B7280'
      ]
    }]
  };

  // Traffic sources data (unchanged, but can be renamed)
  const trafficData = {
    labels: [
      'Direct', 'Google Search', 'Facebook',
      'Instagram', 'Referral', 'Email'
    ],
    datasets: [{
      label: 'Traffic Sources',
      data: [120, 180, 90, 60, 40, 20],
      backgroundColor: [
        'rgba(92, 124, 137, 0.7)',
        'rgba(31, 73, 89, 0.7)',
        'rgba(6, 182, 212, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)'
      ],
    }]
  };

  // Recent bookings (ServiceHub context)
  const recentOrders = [
    {
      id: 1,
      customer: 'Priya Sharma',
      avatar: '👩',
      product: 'Salon at Home',
      amount: '₹1,299',
      status: 'Completed',
      date: '2025-06-19 10:30',
      payment: 'UPI',
      location: 'Mumbai, MH'
    },
    {
      id: 2,
      customer: 'Amit Verma',
      avatar: '👨',
      product: 'Plumbing Service',
      amount: '₹799',
      status: 'Processing',
      date: '2025-06-19 09:45',
      payment: 'Cash',
      location: 'Pune, MH'
    },
    {
      id: 3,
      customer: 'Sneha Patel',
      avatar: '👩',
      product: 'AC Repair',
      amount: '₹1,499',
      status: 'Pending',
      date: '2025-06-19 08:15',
      payment: 'Credit Card',
      location: 'Ahmedabad, GJ'
    },
    {
      id: 4,
      customer: 'Rahul Singh',
      avatar: '👨',
      product: 'Home Cleaning',
      amount: '₹1,099',
      status: 'Completed',
      date: '2025-06-19 07:30',
      payment: 'UPI',
      location: 'Delhi, DL'
    }
  ];

  // Top services (ServiceHub context)
  const topProducts = [
    {
      id: 1,
      name: 'Salon at Home',
      category: 'Salon',
      sales: 432,
      revenue: '₹2,15,000',
      growth: '+18%',
      stock: 120,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Plumbing Service',
      category: 'Plumbing',
      sales: 389,
      revenue: '₹1,75,000',
      growth: '+15%',
      stock: 98,
      rating: 4.7
    },
    {
      id: 3,
      name: 'AC Repair',
      category: 'AC Repair',
      sales: 312,
      revenue: '₹1,48,000',
      growth: '+12%',
      stock: 76,
      rating: 4.8
    },
    {
      id: 4,
      name: 'Home Cleaning',
      category: 'Cleaning',
      sales: 278,
      revenue: '₹1,22,000',
      growth: '+10%',
      stock: 65,
      rating: 4.6
    }
  ];

  // Sales performance metrics (departments)
  const performanceMetrics = {
    labels: ['Salon', 'Plumbing', 'AC Repair', 'Cleaning', 'Painting'],
    datasets: [{
      label: 'Current Period',
      data: [92, 85, 78, 80, 70],
      borderColor: '#5c7c89',
      backgroundColor: 'rgba(92, 124, 137, 0.2)',
      fill: true
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fbfc] to-[#e3e8ee] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div>
            <h1 className="text-3xl font-bold text-[#1f4959] dark:text-white">
              ServiceHub Admin Dashboard
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-gray-500 dark:text-gray-400">
                Welcome back, Admin! Here's what's happening today
              </p>
              <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                Live Updates
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#5c7c89] hover:bg-[#1f4959] text-white font-bold px-4 py-2 rounded-lg shadow transition-all">
              + Add Product
            </button>
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none rounded-lg border-gray-300 pl-3 pr-10 py-2 shadow-sm focus:border-[#5c7c89] focus:ring-[#5c7c89] text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <button className="p-2 rounded-lg bg-[#5c7c89] text-white hover:bg-[#1f4959] transition-colors">
              <ChartBarIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-lg border border-[#e3e8ee] group transition-all"
            >
              <div className="absolute right-0 top-0 w-2 h-full bg-gradient-to-b from-[#5c7c89] to-[#1f4959] opacity-10 group-hover:opacity-20 transition" />
              <div className="relative">
                <div className={`rounded-lg bg-${stat.color}-100 p-3 dark:bg-${stat.color}-900/20`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <EllipsisVerticalIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.name}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <span className={`flex items-center text-sm ${
                    stat.trend === 'up'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.trend === 'up'
                      ? <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                      : <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                    }
                    {stat.change}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {stat.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Trend */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Sales Analytics
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Hourly sales performance
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Yesterday</span>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <Line 
                data={salesData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      mode: 'index',
                      intersect: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      },
                      ticks: {
                        callback: (value) => `$${value}k`
                      }
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                  }
                }} 
              />
            </div>
          </div>

          {/* Revenue Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Revenue Distribution
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  By product category
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <ChartPieIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut 
                data={categoryData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                      }
                    }
                  },
                  cutout: '75%'
                }} 
              />
            </div>
          </div>
        </div>

        {/* Traffic Sources & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Sources */}
          <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Traffic Sources
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Visitor acquisition channels
                </p>
              </div>
            </div>
            <div className="h-[300px]">
              <Bar 
                data={trafficData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Performance Metrics
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Department performance analysis
                </p>
              </div>
            </div>
            <div className="h-[300px]">
              <Radar 
                data={performanceMetrics}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        stepSize: 20
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Orders & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enhanced Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Orders
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Latest transactions
                  </p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Order Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{order.avatar}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {order.customer}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <MapPinIcon className="w-3 h-3 mr-1" />
                              {order.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {order.product}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <CreditCardIcon className="w-3 h-3 mr-1" />
                          {order.payment}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.amount}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {order.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enhanced Top Products */}
          <div className="bg-white rounded-xl shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Top Selling Products
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Best performers this month
                  </p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  View Report
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {topProducts.map((product) => (
                <div key={product.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </p>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {product.growth}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {product.category}
                        </p>
                        <div className="flex items-center">
                          <span className="text-xs text-yellow-500">★</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.revenue}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {product.sales} units
                      </p>
                    </div>
                  </div>
                  {/* Stock Level Indicator */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400">Stock Level</span>
                      <span className="text-gray-700 dark:text-gray-300">{product.stock} units</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div
                        className="bg-indigo-600 h-1.5 rounded-full"
                        style={{ width: `${(product.stock / 2000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;