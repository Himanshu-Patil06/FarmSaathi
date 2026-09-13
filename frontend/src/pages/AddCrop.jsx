function AddCrop({
  setPage,
  cropData,
  handleCropChange,
  handleAddCrop,
}) {
  return (
    <div className="form-page">

      <div className="form-card">

        <div className="form-logo">🌱</div>

        <h2>Add New Crop</h2>

        <p className="form-subtitle">
          Add your crop information
        </p>

        <form onSubmit={handleAddCrop}>

          <label>Crop Name</label>

          <select
            className="language-input"
            name="cropName"
            value={cropData.cropName}
            onChange={handleCropChange}
          >
            <option value="">Select Crop</option>
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Cotton">Cotton</option>
            <option value="Maize">Maize</option>
          </select>

          <label>Planting Date</label>

          <input
            type="date"
            name="plantingDate"
            value={cropData.plantingDate}
            onChange={handleCropChange}
          />

          <label>Field Size (Optional)</label>

          <input
            type="text"
            name="fieldSize"
            placeholder="Example: 2 acres"
            value={cropData.fieldSize}
            onChange={handleCropChange}
          />

          <button
            className="main-form-btn"
            type="submit"
          >
            Add Crop
          </button>

        </form>

        <button
          type="button"
          className="back-btn"
          onClick={() => setPage("dashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>
  );
}

export default AddCrop;