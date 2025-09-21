import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { WorkCenter } from '../types';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';

const WorkCenters: React.FC = () => {
  const [workCenters, setWorkCenters] = useState<WorkCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingWorkCenter, setEditingWorkCenter] = useState<WorkCenter | null>(null);
  const [formData, setFormData] = useState<Partial<WorkCenter>>({
    name: '',
    description: '',
    costPerHour: 0,
    active: true,
  });

  useEffect(() => {
    loadWorkCenters();
  }, []);

  const loadWorkCenters = async () => {
    try {
      const response = await apiService.getWorkCenters();
      setWorkCenters(response.data);
    } catch (error) {
      console.error('Error loading work centers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingWorkCenter) {
        await apiService.updateWorkCenter(editingWorkCenter.id!, formData);
      } else {
        await apiService.createWorkCenter(formData);
      }
      loadWorkCenters();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving work center:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this work center?')) {
      try {
        await apiService.deleteWorkCenter(id);
        loadWorkCenters();
      } catch (error) {
        console.error('Error deleting work center:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      costPerHour: 0,
      active: true,
    });
    setEditingWorkCenter(null);
  };

  const openEditModal = (workCenter: WorkCenter) => {
    setEditingWorkCenter(workCenter);
    setFormData({
      name: workCenter.name,
      description: workCenter.description,
      costPerHour: workCenter.costPerHour,
      active: workCenter.active,
    });
    setShowModal(true);
  };

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Work Centers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Work Center</span>
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
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost per Hour
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workCenters.map((workCenter) => (
              <tr key={workCenter.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {workCenter.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {workCenter.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${workCenter.costPerHour}/hour
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    workCenter.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {workCenter.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(workCenter)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(workCenter.id!)}
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
              {editingWorkCenter ? 'Edit Work Center' : 'Add Work Center'}
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
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cost per Hour ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.costPerHour}
                  onChange={(e) => setFormData({ ...formData, costPerHour: parseFloat(e.target.value) })}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
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
                  {editingWorkCenter ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkCenters;