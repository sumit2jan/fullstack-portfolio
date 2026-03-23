import React, { useState, useEffect } from "react";

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!user) return null; // 🔥 IMPORTANT FIX

  return (
    <div className="modal d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Edit User</h5>

          <input
            className="form-control my-2"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            className="form-control my-2"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            className="form-control my-2"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: e.target.value })
            }
          />

          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary me-2" onClick={onClose}>
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={() => onUpdate(formData)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;