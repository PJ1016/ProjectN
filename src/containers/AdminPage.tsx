import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import { Add, Edit, CloudUpload } from "@mui/icons-material";
import { useState } from "react";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useUpdateStockMutation,
} from "../store/api";
import { type Product } from "../services/firestoreService";
import { storageService } from "../services/storageService";

export default function AdminPage() {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [updateStock] = useUpdateStockMutation();

  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
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
      let imageUrl = editingProduct?.imageUrl || "";

      if (imageFile) {
        imageUrl = await storageService.uploadImage(
          imageFile,
          `${Date.now()}_${imageFile.name}`
        );
      }

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        stock: parseInt(formData.stock),
        description: formData.description,
        category: formData.category,
        imageUrl,
      };

      if (editingProduct?.id) {
        await updateProduct({ id: editingProduct.id, product: productData });
      } else {
        await addProduct(productData);
      }

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
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: Product) => {
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
              {product.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl}
                  alt={product.name}
                />
              )}
              <CardContent>
                <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {product.description}
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
                      ${product.price}
                    </Typography>
                    {product.discount > 0 && (
                      <Typography variant="h6" sx={{ color: "error.main" }}>
                        $
                        {(product.price * (1 - product.discount / 100)).toFixed(
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
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <TextField
                    size="small"
                    type="number"
                    defaultValue={product.stock}
                    onBlur={(e) =>
                      updateStock({
                        id: product.id!,
                        stock: parseInt(e.target.value),
                      })
                    }
                    sx={{ width: 80 }}
                  />
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

          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
            sx={{ mb: 2 }}
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
            <Typography variant="body2" sx={{ mb: 2 }}>
              Selected: {imageFile.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
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
