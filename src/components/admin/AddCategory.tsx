import React, { useState } from 'react';
import './AddCategory.css';
import { toast } from 'react-toastify';

interface AddCategoryFormProps {
    onClose: () => void;
    onSubmit: (newCategory: { categoryName: string }) => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onClose, onSubmit }) => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = () => {
        if (categoryName.trim()) {
            onSubmit({ categoryName });
            toast.success('Category added successfully!');
            setCategoryName('');
            onClose();
        } else {
            toast.error('Category name cannot be empty.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Add Category</h2>
                <form className="addcategory-form">
                    <label className="addcategory-label">Category Name:</label>
                    <input
                        type="text"
                        className="addcategory-input"
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                    />
                    <button type="button" className="addcategory-button" onClick={handleSubmit}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryForm;
