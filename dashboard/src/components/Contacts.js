import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addContact,
  editContact,
  deleteContact,
  viewContact,
} from "../actions/contactActions";
import { v4 as uuidv4 } from "uuid";
import "tailwindcss/tailwind.css"; // This imports the default Tailwind CSS styles.

function Contacts() {
  const contacts = useSelector((state) => state.contact.contacts);
  const [editContactId, setEditContactId] = useState(null);
  const [viewContactId, setViewContactId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false); // Track whether to show the create contact form
  const [viewContactModalOpen, setViewContactModalOpen] = useState(false);
  const [currentViewedContact, setCurrentViewedContact] = useState(null);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    isActive: false, // Initialize isActive as false (inactive)
  });

  // Create a separate state for editing contact
  const [editContactData, setEditContactData] = useState({
    firstName: "",
    lastName: "",
    isActive: false,
  });

  const dispatch = useDispatch();

  const handleAddContact = () => {
    // Open the create contact form modal
    setShowCreateForm(true);
  };

  const handleCreateContact = () => {
    // Generate a unique ID for the new contact
    const newContactId = uuidv4();

    // Create a new contact object with the unique ID and newContact data
    const newContactData = {
      id: newContactId,
      ...newContact,
    };

    // Dispatch the addContact action with the new contact
    dispatch(addContact(newContactData));

    // Clear the newContact state and hide the create contact form
    setNewContact({
      firstName: "",
      lastName: "",
      isActive: false,
    });
    setShowCreateForm(false);
  };

  const handleEditContact = (contactId) => {
    // Set the editContactId state to indicate that we are editing this contact
    setEditContactId(contactId);

    // Find the contact by its ID in the contacts array
    const contactToEdit = contacts.find((contact) => contact.id === contactId);

    // Set the editContactData state with the data of the contact to edit
    setEditContactData({ ...contactToEdit });
  };

  const handleSaveEditedContact = () => {
    // Dispatch the editContact action with the updated contact data and contactId
    dispatch(editContact({ ...editContactData, id: editContactId }));

    // Clear the editContactData state and reset the editContactId
    setEditContactData({
      firstName: "",
      lastName: "",
      isActive: false,
    });
    setEditContactId(null);
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  const handleViewContact = (contactId) => {
    // Find the contact by its ID in the contacts array
    const contactToView = contacts.find((contact) => contact.id === contactId);

    // Set the currentViewedContact state with the data of the contact to view
    setCurrentViewedContact(contactToView);

    // Open the view contact details modal
    setViewContactModalOpen(true);
  };

  return (
    <div>
           <div className="bg-blue-500 p-4 text-white">
        <h1 className="text-center text-2xl font-semibold">Contacts Page</h1>
        {/* Add any Navbar content or navigation links here */}
      </div>

         <div className="p-4 sm:p-6 md:p-8">
      {/* <div className="text-center mt-4">
        <h2 className="text-2xl text-yellow font-semibold mb-4">
          Contacts Page
        </h2>
      </div> */}

      <div className="flex justify-center mt-4">
        <button
          onClick={handleAddContact}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Create Contact
        </button>
      </div>

      {/* Render the create contact form modal */}
      {showCreateForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
              Create Contact
            </h3>
            <form onSubmit={handleCreateContact}>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={newContact.firstName}
                  onChange={(e) =>
                    setNewContact({ ...newContact, firstName: e.target.value })
                  }
                  required
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={newContact.lastName}
                  onChange={(e) =>
                    setNewContact({ ...newContact, lastName: e.target.value })
                  }
                  required
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Status:</label>
                <div className="flex items-center mt-1">
                  <input
                    type="radio"
                    id="activeStatus"
                    value={true}
                    checked={newContact.isActive === true}
                    onChange={() =>
                      setNewContact({ ...newContact, isActive: true })
                    }
                    className="mr-2 border border-gray-300 rounded"
                  />
                  <label htmlFor="activeStatus" className="mr-4">
                    Active
                  </label>
                  <input
                    type="radio"
                    id="inactiveStatus"
                    value={false}
                    checked={newContact.isActive === false}
                    onChange={() =>
                      setNewContact({ ...newContact, isActive: false })
                    }
                    className="mr-2 border border-gray-300 rounded"
                  />
                  <label htmlFor="inactiveStatus">Inactive</label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Render the view contact details modal */}
      {viewContactModalOpen && currentViewedContact && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
              Contact Details
            </h3>
            <div>
              <p className="font-semibold">First Name:</p>
              <p>{currentViewedContact.firstName}</p>
            </div>
            <div>
              <p className="font-semibold">Last Name:</p>
              <p>{currentViewedContact.lastName}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p>{currentViewedContact.isActive ? "Active" : "Inactive"}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewContactModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                {contact.firstName} {contact.lastName}
              </h3>
              <p className="text-gray-600">
                Status: {contact.isActive ? "Active" : "Inactive"}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleViewContact(contact.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleEditContact(contact.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Render the edit form when editContactId is set */}
      {editContactId !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
              Edit Contact
            </h3>
            <form onSubmit={handleSaveEditedContact}>
              <div className="mb-4">
                <label
                  htmlFor="editFirstName"
                  className="block text-sm font-medium"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="editFirstName"
                  value={editContactData.firstName}
                  onChange={(e) =>
                    setEditContactData({
                      ...editContactData,
                      firstName: e.target.value,
                    })
                  }
                  required
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editLastName"
                  className="block text-sm font-medium"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="editLastName"
                  value={editContactData.lastName}
                  onChange={(e) =>
                    setEditContactData({
                      ...editContactData,
                      lastName: e.target.value,
                    })
                  }
                  required
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Status:</label>
                <div className="flex items-center mt-1">
                  <input
                    type="radio"
                    id="editActiveStatus"
                    value={true}
                    checked={editContactData.isActive === true}
                    onChange={() =>
                      setEditContactData({ ...editContactData, isActive: true })
                    }
                    className="mr-2 border border-gray-300 rounded"
                  />
                  <label htmlFor="editActiveStatus" className="mr-4">
                    Active
                  </label>
                  <input
                    type="radio"
                    id="editInactiveStatus"
                    value={false}
                    checked={editContactData.isActive === false}
                    onChange={() =>
                      setEditContactData({
                        ...editContactData,
                        isActive: false,
                      })
                    }
                    className="mr-2 border border-gray-300 rounded"
                  />
                  <label htmlFor="editInactiveStatus">Inactive</label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditContactId(null)}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
 
  );
}

export default Contacts;
