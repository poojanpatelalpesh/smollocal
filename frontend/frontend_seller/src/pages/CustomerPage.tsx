import React, { useState } from 'react';
import { Edit, Trash2, User, Phone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import Notification from '../components/Notification';
import './CustomerPage.css';
import { useAuth } from '../context/AuthContext';
import { customersAPI } from '../services/api';

interface Customer {
  _id: string;
  name: string;
  phone: string;
}

const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; customerId: string | null; customerName: string }>({
    isOpen: false,
    customerId: null,
    customerName: ''
  });
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });
  const { token } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) return;
    customersAPI.getAll(token)
      .then(setCustomers)
      .catch(() => setCustomers([]));
  }, [token]);

  const showNotification = (type: 'success' | 'error' | 'warning' | 'info', title: string, message?: string) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    if (!trimmedName || !trimmedPhone) {
      showNotification('warning', 'Validation Error', 'Please fill in all fields');
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      showNotification('warning', 'Invalid Phone Number', 'Phone number must be exactly 10 digits');
      return;
    }
    if (editingId) {
      if (!token) return;
      try {
        const updatedCustomer = await customersAPI.update(token, editingId, trimmedName, trimmedPhone);
        setCustomers(prev => prev.map(c => c._id === editingId ? updatedCustomer : c));
        showNotification('success', 'Customer Updated', `${trimmedName} has been updated successfully!`);
        setEditingId(null);
        setFormData({ name: '', phone: '' });
      } catch (err: any) {
        showNotification('error', 'Update Failed', err.message || 'Failed to update customer');
      }
      return;
    }
    if (!token) return;
    try {
      const newCustomer = await customersAPI.add(token, trimmedName, trimmedPhone);
      setCustomers(prev => [...prev, newCustomer]);
      showNotification('success', 'Customer Added', `${trimmedName} has been added successfully!`);
      setFormData({ name: '', phone: '' });
    } catch (err: any) {
      showNotification('error', 'Add Failed', err.message || 'Failed to add customer');
    }
  };

  const handleEdit = (customer: Customer) => {
    setFormData({
      name: customer.name,
      phone: customer.phone
    });
    setEditingId(customer._id);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await customersAPI.delete(token, id);
      setCustomers(prev => prev.filter(customer => customer._id !== id));
      setDeleteModal({ isOpen: false, customerId: null, customerName: '' });
      showNotification('success', 'Customer Deleted', 'Customer has been deleted successfully!');
    } catch (err: any) {
      showNotification('error', 'Delete Failed', err.message || 'Failed to delete customer');
    }
  };

  const openDeleteModal = (customer: Customer) => {
    setDeleteModal({
      isOpen: true,
      customerId: customer._id,
      customerName: customer.name
    });
  };

  const handleCancel = () => {
    setFormData({ name: '', phone: '' });
    setEditingId(null);
  };

  return (
    <div className="customer-page">
      <div className="header">
        <h1 className="dashboard-title">
        <button className="back-button" onClick={() => navigate('/Landing')}>
        <ArrowLeft size={30} />
        </button>
        Customer details
        </h1>
      </div>

      <div className="main-content">
        <div className="form-section">
          <div className="form-header">
            <h2>{editingId ? 'EDIT CUSTOMER' : 'ADD CUSTOMER'}</h2>
          </div>

          <form onSubmit={handleSubmit} className="customer-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <User className="label-icon" />
                NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter customer name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                <Phone className="label-icon" />
                PHONE NUMBER
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter phone number"
                pattern="[0-9]{10}"
                maxLength={10}
                inputMode="numeric"
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                {editingId ? 'UPDATE' : 'ADD'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="btn-secondary">
                  CANCEL
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="customers-section">
          <div className="customers-header">
            <h2>YOUR CUSTOMERS</h2>
          </div>

          <div className="customers-list">
            {customers.length === 0 ? (
              <div className="empty-state">
                <User className="empty-icon" />
                <p>No customers added yet</p>
                <p className="empty-subtitle">Add your first customer to get started</p>
              </div>
            ) : (
              customers.map((customer) => (
                <div key={customer._id} className="customer-card">
                  <div className="customer-info">
                    <div className="customer-name">
                      <User className="customer-icon" />
                      {customer.name}
                    </div>
                    <div className="customer-phone">
                      <Phone className="customer-icon" />
                      {customer.phone}
                    </div>
                  </div>
                  <div className="customer-actions">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="action-btn edit-btn"
                      title="Edit customer"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(customer)}
                      className="action-btn delete-btn"
                      title="Delete customer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, customerId: null, customerName: '' })}
        onConfirm={() => deleteModal.customerId && handleDelete(deleteModal.customerId)}
        title="Delete Customer"
        message={`Are you sure you want to delete "${deleteModal.customerName}"? This action cannot be undone.`}
        type="danger"
        confirmText="Delete Customer"
        cancelText="Cancel"
      />

      <Notification
        isOpen={notification.isOpen}
        onClose={() => setNotification(prev => ({ ...prev, isOpen: false }))}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </div>
  );
};

export default CustomerPage;