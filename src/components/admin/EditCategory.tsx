import React, { useState } from 'react';
import './EditCategory.css';
import { toast } from 'react-toastify';

interface EditCategoryFormProps {
    category: any;
    onClose: () => void;
    onSubmit: (category: any) => void;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ category, onClose, onSubmit }) => {
    const [categoryName, setCategoryName] = useState(category.categoryName);

    const handleSubmit = () => {
        if (categoryName.trim()) {
            const updatedCategory = {
                ...category,
                categoryName,
            };
            onSubmit(updatedCategory);
            toast.success('Category updated successfully!');
            onClose(); // Optionally close the form
        } else {
            toast.error('Category name cannot be empty.');
        }
    };

    return (
        <div className="editcategory-modal">
            <div className="editcategory-modal-content">
                <span className="editcategory-close" onClick={onClose}>&times;</span>
                <h2>Edit Category</h2>
                <form className="editcategory-form">
                    <label className="editcategory-label">Category Name:</label>
                    <input
                        type="text"
                        className="editcategory-input"
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                    />
                    <button type="button" className="editcategory-button" onClick={handleSubmit}>Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditCategoryForm;
