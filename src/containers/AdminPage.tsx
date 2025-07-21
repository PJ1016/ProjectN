import { Add, Edit, CloudUpload, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useUpdateStockMutation,
  useDeleteProductMutation,
} from "../store/api";
import { type Product } from "../services/firestoreService";
import { storageService } from "../services/storageService";
import { apiConfig } from "../config/api";

export default function AdminPage() {
  const { data: products = [], isLoading: isLoadingProducts } = useGetProductsQuery();
  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdatingProduct }] = useUpdateProductMutation();
  const [updateStock, { isLoading: isUpdatingStock }] = useUpdateStockMutation();
  const [deleteProduct, { isLoading: isDeletingProduct }] = useDeleteProductMutation();
  
  // Combined loading state for any API operation
  const isLoading = isLoadingProducts || isAddingProduct || isUpdatingProduct || isUpdatingStock || isDeletingProduct;

  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);

  // Check if Python API is available
  useEffect(() => {
    const checkApiAvailability = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

        const response = await fetch(apiConfig.endpoints.health, {
          method: "GET",
          signal: controller.signal,
        }).catch(() => null);

        clearTimeout(timeoutId);
        setApiAvailable(!!response && response.ok);
      } catch (error) {
        console.log("API check failed:", error);
        setApiAvailable(false);
      }
    };

    checkApiAvailability();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    category: "",
  });

  const handleSubmit = async () => {
    try {
      setUploading(true);

      let imageUrl =
        editingProduct?.imageUrl ||
        "https://firebasestorage.googleapis.com/v0/b/projectn-daee6.appspot.com/o/placeholder.png?alt=media";

      // Upload image if selected using Python API
      if (imageFile) {
        try {
          const formData = new FormData();
          formData.append("file", imageFile);

          console.log("Uploading image to Python API...");

          // Set a timeout for the fetch request
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

          try {
            const response = await fetch(apiConfig.endpoints.upload, {
              method: "POST",
              body: formData,
              signal: controller.signal,
            });

            clearTimeout(timeoutId); // Clear the timeout

            console.log("Response status:", response.status);
            const responseText = await response.text();
            console.log("Response body:", responseText);

            if (!response.ok) {
              let errorDetails = "Unknown error";
              try {
                const errorJson = JSON.parse(responseText);
                errorDetails =
                  errorJson.details ||
                  errorJson.error ||
                  errorJson.message ||
                  "Unknown error";
              } catch (e) {
                errorDetails = responseText || `Status: ${response.status}`;
              }
              throw new Error(`Upload failed: ${errorDetails}`);
            }

            // Parse the response text as JSON
            const data = JSON.parse(responseText);
            imageUrl = data.imageUrl;
            console.log("Image uploaded successfully:", imageUrl);
          } catch (fetchError: any) {
            clearTimeout(timeoutId);
            if (fetchError.name === "AbortError") {
              throw new Error(
                "API request timed out. Is the Python server running?"
              );
            }
            throw fetchError;
          }
        } catch (error: any) {
          const errorMsg = `Failed to upload image: ${
            error.message || "Unknown error"
          }`;
          console.error("Image upload error:", errorMsg);
          setError(errorMsg);
          console.log("Using placeholder image instead");
          // Continue with placeholder image
        }
      }

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        stock: parseInt(formData.stock),
        description: formData.description,
        category: formData.category,
        imageUrl: imageUrl,
      };

      console.log("Saving product:", productData);

      try {
        if (editingProduct?.id) {
          console.log("Updating product with ID:", editingProduct.id);
          const result = await updateProduct({
            id: editingProduct.id,
            product: productData,
          });
          console.log("Update result:", result);
        } else {
          console.log("Adding new product");
          const result = await addProduct(productData);
          console.log("Add result:", result);
        }

        console.log("Product saved successfully");
        setOpen(false);
        setFormData({
          name: "",
          price: "",
          discount: "",
          stock: "",
          description: "",
          category: "",
        });
        setEditingProduct(null);
        setImageFile(null);
      } catch (error: any) {
        const errorMsg = `Error saving product: ${
          error.message || "Unknown error"
        }`;
        console.error(errorMsg, error);
        setError(errorMsg);
      }
    } catch (error: any) {
      const errorMsg = `Error: ${error.message || "Unknown error"}`;
      console.error("Error in handleSubmit:", errorMsg, error);
      setError(errorMsg);
    } finally {
      // Ensure uploading state is reset
      setUploading(false);
    }
  };
  console.log("products", products);
  const handleEdit = (product: Product) => {
    setError(null);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      discount: product.discount.toString(),
      stock: product.stock.toString(),
      description: product.description,
      category: product.category,
    });
    setOpen(true);
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
      } catch (error: any) {
        setError(`Error deleting product: ${error.message || "Unknown error"}`);
      }
    }
  };

  if (isLoading)
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

  return (
    <Container sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          sx={{ background: "linear-gradient(45deg, #e91e63, #f06292)" }}
        >
          Add Product
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} md={6} lg={4} key={product.id}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={
                  product.imageUrl ||
                  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect fill='%23e9e9e9' width='300' height='200'/%3E%3Ctext fill='%23999999' font-family='Arial' font-size='14' x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'%3EProduct Image%3C/text%3E%3C/svg%3E"
                }
                alt={product.name}
                onError={(e) => {
                  // If image fails to load, use inline SVG placeholder
                  e.currentTarget.src =
                    "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect fill='%23e9e9e9' width='300' height='200'/%3E%3Ctext fill='%23999999' font-family='Arial' font-size='14' x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'%3EProduct Image%3C/text%3E%3C/svg%3E";
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {product.description.substring(0, 100)}...
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration:
                          product.discount > 0 ? "line-through" : "none",
                        color:
                          product.discount > 0 ? "text.secondary" : "inherit",
                      }}
                    >
                      ₹{product.price}
                    </Typography>
                    {product.discount > 0 && (
                      <Typography variant="h6" sx={{ color: "error.main" }}>
                        ₹{(product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )}
                      </Typography>
                    )}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: product.stock < 10 ? "error.main" : "success.main",
                    }}
                  >
                    Stock: {product.stock}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <TextField
                      size="small"
                      type="number"
                      defaultValue={product.stock}
                      disabled={isUpdatingStock}
                      onBlur={(e) =>
                        updateStock({
                          id: product.id!,
                          stock: parseInt(e.target.value),
                        })
                      }
                      sx={{ width: 80 }}
                    />
                  </Box>
                  <Box>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => handleEdit(product)}
                      disabled={isUpdatingProduct || isDeletingProduct}
                      sx={{ mr: 1 }}
                    >
                      {isUpdatingProduct ? <CircularProgress size={16} /> : "Edit"}
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={isDeletingProduct ? null : <Delete />}
                      onClick={() => handleDelete(product.id!)}
                      disabled={isUpdatingProduct || isDeletingProduct}
                    >
                      {isDeletingProduct ? <CircularProgress size={16} /> : "Delete"}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Discount (%)"
            type="number"
            value={formData.discount}
            onChange={(e) =>
              setFormData({ ...formData, discount: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Stock"
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            sx={{ mb: 2 }}
          />

          {/* Image upload section - Using Python API */}
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Images are uploaded via Python API to avoid CORS issues
              </Typography>
              <Box
                sx={{
                  ml: 1,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor:
                    apiAvailable === true
                      ? "success.main"
                      : apiAvailable === false
                      ? "error.main"
                      : "grey.400",
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                {apiAvailable === true
                  ? "API Connected"
                  : apiAvailable === false
                  ? "API Unavailable"
                  : "Checking API..."}
              </Typography>
            </Box>

            {apiAvailable === false && (
              <Box
                sx={{ p: 1, bgcolor: "warning.light", borderRadius: 1, mt: 1 }}
              >
                <Typography variant="caption" color="warning.dark">
                  <strong>Python API server is not running.</strong> Image
                  uploads will use placeholder images instead.
                  <br />
                  To enable image uploads, run the Python API server:
                  <br />
                  <code>cd api && python app.py</code>
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ mb: 2 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{ mb: 1 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </Button>
            {imageFile && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Selected: {imageFile.name}
                </Typography>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Image preview"
                  style={{ maxHeight: 100, maxWidth: "100%", display: "block" }}
                />
              </Box>
            )}
            {editingProduct?.imageUrl && !imageFile && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={editingProduct.imageUrl}
                  alt="Current product"
                  style={{ maxHeight: 100, maxWidth: "100%" }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        {error && (
          <Box
            sx={{
              mx: 3,
              mb: 2,
              p: 1,
              bgcolor: "error.light",
              color: "error.contrastText",
              borderRadius: 1,
            }}
          >
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setError(null);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setError(null);
              handleSubmit();
            }}
            variant="contained"
            disabled={uploading}
          >
            {uploading ? (
              <CircularProgress size={20} />
            ) : editingProduct ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}