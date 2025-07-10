import React from 'react';
import { Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  categories,
  isOpen,
  onClose
}) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]]
    });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating
    });
  };

  const handleStockChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      inStock: checked
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 1000],
      rating: 0,
      inStock: false
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000 ||
    filters.rating > 0 ||
    filters.inStock;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-background border-r border-border z-50 transform transition-transform duration-300 md:relative md:transform-none md:w-64",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <Card className="p-4 mb-6">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-3">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={category}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </Card>

          {/* Price Range */}
          <Card className="p-4 mb-6">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceRangeChange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </Card>

          {/* Rating */}
          <Card className="p-4 mb-6">
            <h3 className="font-medium mb-3">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={cn(
                    "flex items-center space-x-2 w-full text-left p-2 rounded hover:bg-accent transition-colors",
                    filters.rating === rating && "bg-accent"
                  )}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm">& up</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Stock Status */}
          <Card className="p-4">
            <h3 className="font-medium mb-3">Availability</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStock}
                onCheckedChange={handleStockChange}
              />
              <label htmlFor="inStock" className="text-sm cursor-pointer">
                In Stock Only
              </label>
            </div>
          </Card>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-6">
              <h3 className="font-medium mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {filters.categories.map(category => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleCategoryChange(category, false)}
                  >
                    {category}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
                {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                  <Badge variant="secondary">
                    ${filters.priceRange[0]}-${filters.priceRange[1]}
                  </Badge>
                )}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};