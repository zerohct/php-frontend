import React, { useEffect, useState } from "react";
import { categoryApi, Category } from "../../api/CategoriesApi"; // Giả định bạn đã có định nghĩa cho Category

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryApi.getAllCategories();
      setCategories(response.data); // Giả sử response là { status, data }
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await categoryApi.deleteCategory(id);
        loadCategories();
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => {
                      setEditCategory(category);
                      setIsEditModalOpen(true); // Mở modal chỉnh sửa
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <Modal title="Add New Category" onClose={() => setIsAddModalOpen(false)}>
          <CategoryForm
            onSubmit={async (data) => {
              await categoryApi.createCategory(data);
              setIsAddModalOpen(false);
              loadCategories();
            }}
          />
        </Modal>
      )}

      {isEditModalOpen && editCategory && (
        <Modal title="Edit Category" onClose={() => setIsEditModalOpen(false)}>
          <CategoryForm
            initialData={editCategory}
            onSubmit={async (data) => {
              await categoryApi.updateCategory(editCategory.id, data);
              setIsEditModalOpen(false);
              loadCategories();
            }}
          />
        </Modal>
      )}
    </div>
  );
};

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg w-full max-w-md">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose}>
          ×
        </button>
      </div>
      {children}
    </div>
  </div>
);

const CategoryForm: React.FC<{
  initialData?: Category;
  onSubmit: (data: Partial<Category>) => Promise<void>;
}> = ({ initialData, onSubmit }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ name, description });
  };


  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            id="category-name" // Thêm id cho input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            title="Enter the category name" // Thêm title attribute
            placeholder="Category Name" // Thêm placeholder attribute
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="category-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description:
          </label>
          <input
            id="category-description" // Thêm id cho input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            title="Enter a description for the category" // Thêm title attribute
            placeholder="Category Description" // Thêm placeholder attribute
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600"
        >
          Save Category
        </button>
      </div>
    </form>
  );
};
export default CategoryList;