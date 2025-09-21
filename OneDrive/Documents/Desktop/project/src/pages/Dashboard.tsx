import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { ClipboardListIcon as ClipboardDocumentListIcon, YoutubeIcon as CubeIcon, UsersIcon, WrenchIcon } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    manufacturingOrders: 0,
    workOrders: 0,
    boms: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [moResponse, woResponse, bomResponse, usersResponse] = await Promise.all([
        apiService.getManufacturingOrders(),
        apiService.getWorkOrders(),
        apiService.getBOMs(),
        apiService.getUsers(),
      ]);

      setStats({
        manufacturingOrders: moResponse.data.length || 0,
        workOrders: woResponse.data.length || 0,
        boms: bomResponse.data.length || 0,
        users: usersResponse.data.length || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Manufacturing Orders',
      value: stats.manufacturingOrders,
      icon: ClipboardDocumentListIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Work Orders',
      value: stats.workOrders,
      icon: WrenchIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Bill of Materials',
      value: stats.boms,
      icon: CubeIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Users',
      value: stats.users,
      icon: UsersIcon,
      color: 'bg-purple-500',
    },
  ];

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Overview of your manufacturing system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div
            key={card.name}
            className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}
                  >
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.name}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {card.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">System initialized</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Dashboard loaded</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
              Create Manufacturing Order
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors">
              Add Work Order
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors">
              Create BOM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;