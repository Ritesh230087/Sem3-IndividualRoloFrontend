import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCategoryForm from './AddCategory';
import EditCategoryForm from './EditCategory';
import './Category.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Category {
    id: number;
    categoryName: string;
}

const CategoryPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState<{ show: boolean, category?: Category }>({ show: false });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleAddCategory = async (newCategory: any) => {
        try {
            await axios.post('http://localhost:8080/category/add', newCategory);
            const response = await axios.get('http://localhost:8080/category/categories');
            setCategories(response.data);
            setShowAddCategoryModal(false);
            toast.success('Category added successfully!');
        } catch (error) {
            console.error('Error adding category:', error);
            toast.error('Error adding category.');
        }
    };

    const handleDeleteCategory = async (categoryId: number) => {
        try {
            await axios.delete(`http://localhost:8080/category/categories/${categoryId}`);
            setCategories(categories.filter(category => category.id !== categoryId));
            toast.success('Category deleted successfully!');
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Error deleting category.');
        }
    };

    const handleEditCategory = async (updatedCategory: Category) => {
        try {
            await axios.put(`http://localhost:8080/category/categories/${updatedCategory.id}`, updatedCategory);
            const response = await axios.get('http://localhost:8080/category/categories');
            setCategories(response.data);
            setShowEditCategoryModal({ show: false });
            toast.success('Category updated successfully!');
        } catch (error) {
            console.error('Error editing category:', error);
            toast.error('Error updating category.');
        }
    };

    return (
        <div className="category-page-container">
            <button className="add-category-btn-custom" onClick={() => setShowAddCategoryModal(true)}>Add Category</button>
            <table className="category-table-custom">
                <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.categoryName}</td>
                        <td>
                            <button className="edit-btn-custom" onClick={() => setShowEditCategoryModal({ show: true, category })}>Edit</button>
                            <button className="delete-btn-custom" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showAddCategoryModal && (
                <AddCategoryForm
                    onClose={() => setShowAddCategoryModal(false)}
                    onSubmit={handleAddCategory}
                />
            )}
            {showEditCategoryModal.show && showEditCategoryModal.category && (
                <EditCategoryForm
                    category={showEditCategoryModal.category}
                    onClose={() => setShowEditCategoryModal({ show: false })}
                    onSubmit={handleEditCategory}
                />
            )}
            <ToastContainer />
        </div>
    );
}

export default CategoryPage;
