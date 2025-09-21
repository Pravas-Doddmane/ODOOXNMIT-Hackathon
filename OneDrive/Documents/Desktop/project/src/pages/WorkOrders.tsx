import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { WorkOrder, ManufacturingOrder, WorkCenter, User } from '../types';
import { PlusIcon, PencilIcon, TrashIcon, PlayIcon, CheckCircleIcon } from 'lucide-react';

const WorkOrders: React.FC = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [manufacturingOrders, setManufacturingOrders] = useState<ManufacturingOrder[]>([]);
  const [workCenters, setWorkCenters] = useState<WorkCenter[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<WorkOrder | null>(null);
  const [formData, setFormData] = useState<Partial<WorkOrder>>({
    name: '',
    description: '',
    status: 'PENDING',
    duration: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [workOrdersResponse, manufacturingOrdersResponse, workCentersResponse, usersResponse] = await Promise.all([
        apiService.getWorkOrders(),
        apiService.getManufacturingOrders(),
        apiService.getWorkCenters(),
        apiService.getUsers(),
      ]);
      setWorkOrders(workOrdersResponse.data);
      setManufacturingOrders(manufacturingOrdersResponse.data);
      setWorkCenters(workCentersResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOrder) {
        await apiService.updateWorkOrder(editingOrder.id!, formData);
      } else {
        await apiService.createWorkOrder(formData);
      }
      loadData();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving work order:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this work order?')) {
      try {
        await apiService.deleteWorkOrder(id);
        loadData();
      } catch (error) {
        console.error('Error deleting work order:', error);
      }
    }
  };

  const handleStart = async (id: number) => {
    try {
      await apiService.startWorkOrder(id);
      loadData();
    } catch (error) {
      console.error('Error starting work order:', error);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await apiService.completeWorkOrder(id);
      loadData();
    } catch (error) {
      console.error('Error completing work order:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      status: 'PENDING',
      duration: 0,
    });
    setEditingOrder(null);
  };

  const openEditModal = (workOrder: WorkOrder) => {
    setEditingOrder(workOrder);
    setFormData({
      name: workOrder.name,
      description: workOrder.description,
      status: workOrder.status,
      duration: workOrder.duration,
      manufacturingOrder: workOrder.manufacturingOrder,
      workCenter: workOrder.workCenter,
      operator: workOrder.operator,
    });
    setShowModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Work Order</span>
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Work Center
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Operator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workOrders.map((workOrder) => (
              <tr key={workOrder.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {workOrder.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(workOrder.status)}`}>
                    {workOrder.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {workOrder.duration} hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {workOrder.workCenter?.name || 'Not assigned'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {workOrder.operator?.name || 'Not assigned'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {workOrder.status === 'PENDING' && (
                      <button
                        onClick={() => handleStart(workOrder.id!)}
                        className="text-green-600 hover:text-green-900"
                        title="Start Work Order"
                      >
                        <PlayIcon className="h-4 w-4" />
                      </button>
                    )}
                    {workOrder.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => handleComplete(workOrder.id!)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Complete Work Order"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => openEditModal(workOrder)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(workOrder.id!)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingOrder ? 'Edit Work Order' : 'Add Work Order'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (hours)</label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {editingOrder ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrders;