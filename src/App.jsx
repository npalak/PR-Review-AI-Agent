import { useMemo, useRef, useState } from 'react'
import { AgGridReact, AgGridProvider } from 'ag-grid-react'
import { AllCommunityModule } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './App.css'

// Dummy data for initial table rows
const initialRows = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', department: 'Sales', city: 'Mumbai' },
  { id: 2, name: 'Diya Patel', email: 'diya@example.com', department: 'Engineering', city: 'Pune' },
  { id: 3, name: 'Vivaan Gupta', email: 'vivaan@example.com', department: 'Marketing', city: 'Delhi' },
  { id: 4, name: 'Anaya Singh', email: 'anaya@example.com', department: 'Finance', city: 'Bengaluru' },
  { id: 5, name: 'Krish Mehta', email: 'krish@example.com', department: 'Support', city: 'Hyderabad' },
  { id: 6, name: 'Myra Kapoor', email: 'myra@example.com', department: 'HR', city: 'Chennai' },
]

const emptyForm = {
  name: '',
  email: '',
  department: '',
  city: '',
}

function App() {
  const gridRef = useRef(null)
  const [rowData, setRowData] = useState(initialRows)
  const [searchText, setSearchText] = useState('')
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 120,
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
    }),
    [],
  )

  const revealUpdatedRows = () => {
    const api = gridRef.current?.api

    if (!api) {
      return
    }

    api.setFilterModel(null)
    api.paginationGoToFirstPage()
  }

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (editingId !== null) {
      setRowData((current) =>
        current.map((row) => (row.id === editingId ? { ...row, ...formData, id: editingId } : row)),
      )
      setSearchText('')
      revealUpdatedRows()
      resetForm()
      return
    }

    const nextId = rowData.length > 0 ? Math.max(...rowData.map((row) => row.id)) + 1 : 1

    setRowData((current) => [{ id: nextId, ...formData }, ...current])
    setSearchText('')
    revealUpdatedRows()
    resetForm()
  }

  const handleEdit = (row) => {
    setEditingId(row.id)
    setFormData({
      name: row.name,
      email: row.email,
      department: row.department,
      city: row.city,
    })
  }

  const handleDelete = (id) => {
    setRowData((current) => current.filter((row) => row.id !== id))

    if (editingId === id) {
      resetForm()
    }
  }
  
  const columnDefs = [
    { headerName: 'ID', field: 'id', maxWidth: 90, filter: 'agNumberColumnFilter' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Department', field: 'department' },
    { headerName: 'City', field: 'city' },
    {
      headerName: 'Actions',
      field: 'actions',
      sortable: false,
      filter: false,
      minWidth: 180,
      cellRenderer: (params) => (
        <div className="action-buttons">
          <button type="button" className="grid-button secondary" onClick={() => handleEdit(params.data)}>
            Edit
          </button>
          <button type="button" className="grid-button danger" onClick={() => handleDelete(params.data.id)}>
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Home Page</p>
          <h1>React AG Grid CRUD Demo</h1>
          <p className="subtitle">
            Manage dummy employee data with filtering, pagination, and inline row actions.
          </p>
        </div>
        <div className="stats-card">
          <span>Total Rows</span>
          <strong>{rowData.length}</strong>
        </div>
      </section>

      <section className="content-grid">
        <form className="editor-card" onSubmit={handleSubmit}>
          <div className="card-heading">
            <h2>{editingId !== null ? 'Edit Row' : 'Add Row'}</h2>
            <p>{editingId !== null ? `Updating row #${editingId}` : 'Create a new row in the table.'}</p>
          </div>

          <label>
            Name
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" required />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
          </label>

          <label>
            Department
            <input
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Enter department"
              required
            />
          </label>

          <label>
            City
            <input name="city" value={formData.city} onChange={handleInputChange} placeholder="Enter city" required />
          </label>

          <div className="form-actions">
            <button type="submit" className="primary-button">
              {editingId !== null ? 'Update Row' : 'Add Row'}
            </button>
            <button type="button" className="ghost-button" onClick={resetForm}>
              Clear
            </button>
          </div>
        </form>

        <section className="table-card">
          <div className="table-toolbar">
            <div>
              <h2>Employee Table</h2>
              <p>Use the search box or column filters to narrow results.</p>
            </div>
            <input
              className="search-input"
              type="text"
              placeholder="Quick filter table..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <div className="ag-theme-alpine table-wrapper">
            <AgGridProvider modules={[AllCommunityModule]}>
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                quickFilterText={searchText}
                pagination
                paginationPageSize={5}
                paginationPageSizeSelector={[5, 10, 20]}
              />
            </AgGridProvider>
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
