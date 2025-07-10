import React, { useState, useMemo } from 'react';
import { Grid, List, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from './Header';
import { ProductCard } from './ProductCard';
import { FilterSidebar, FilterState } from './FilterSidebar';
import { ShoppingCart } from './ShoppingCart';
import { ProductModal } from './ProductModal';
import { Product } from '@/contexts/AppContext';
import { mockProducts, categories } from '@/data/mockProducts';

type ViewMode = 'grid' | 'list';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

export const Store: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    rating: 0,
    inStock: false
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
                             filters.categories.includes(product.category);
      
      // Price filter
      const matchesPrice = product.price >= filters.priceRange[0] && 
                          product.price <= filters.priceRange[1];
      
      // Rating filter
      const matchesRating = filters.rating === 0 || product.rating >= filters.rating;
      
      // Stock filter
      const matchesStock = !filters.inStock || product.inStock;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return 0; // Would use creation date in real app
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  className="md:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                  {filteredAndSortedProducts.length} products found
                  {searchQuery && (
                    <span> for "{searchQuery}"</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* View Toggle */}
                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none border-l"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.categories.length > 0 || filters.rating > 0 || filters.inStock || 
              filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm font-medium">Active filters:</span>
                {filters.categories.map(category => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
                {filters.rating > 0 && (
                  <Badge variant="secondary">
                    {filters.rating}+ stars
                  </Badge>
                )}
                {filters.inStock && (
                  <Badge variant="secondary">
                    In Stock
                  </Badge>
                )}
                {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                  <Badge variant="secondary">
                    ${filters.priceRange[0]}-${filters.priceRange[1]}
                  </Badge>
                )}
              </div>
            )}
            
            {/* Products Grid/List */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      categories: [],
                      priceRange: [0, 1000],
                      rating: 0,
                      inStock: false
                    });
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {filteredAndSortedProducts.map(product => (
                  <div key={product.id} className="animate-fade-in">
                    <ProductCard
                      product={product}
                      view={viewMode}
                      onClick={handleProductClick}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Shopping Cart */}
      <ShoppingCart />
      
      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />
    </div>
  );
};