// missing data type
if (error.name === "ValidationError") {
  const validationErrors = error.errors.map((err) => err.message);
  console.error("Validation errors:", validationErrors.join(", "));
  res
    .status(400)
    .json({ message: "Validation failed:", errors: validationErrors });
}

// Invalid data type
if (error.name === "CastError") {
  console.error("Cast error:", error.message);
  res
    .status(400)
    .json({ message: "Invalid data format:", error: error.message });
}

// Duplicate unique key
if (error.code === 11000 || error.message.includes("duplicate key")) {
  console.error("Duplicate key error:", error.message);
  res.status(409).json({ message: "Duplicate key error:" });
}

// Missing required fields
if (error.name === "ValidationError") {
  console.error("Validation error:", error.message);
  res.status(400).json({ message: "Validation error:", error: error.message });
}

// Unauthorized access
if (error.name === "UnauthorizedError") {
  console.error("Unauthorized access:", error.message);
  res.status(401).json({ message: "Unauthorized access:" });
}

// Internal server error
if (error) {
  console.error("Internal server error:", error.message);
  res.status(500).json({ message: "Internal server error:" });
}
