from django.contrib import admin
from .models import Category, Product, Cart, CartItem, Order, OrderItem, Wishlist, Review

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon', 'parent')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'brand', 'price', 'discount_price', 'rating', 'is_featured', 'is_deal_of_the_day', 'is_trending')
    list_filter = ('category', 'brand', 'is_featured', 'is_deal_of_the_day', 'is_trending')
    search_fields = ('name', 'brand', 'description')
    prepopulated_fields = {'slug': ('name',)}


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'session_id', 'created_at')
    inlines = [CartItemInline]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'full_name', 'final_amount', 'payment_method', 'order_status', 'created_at')
    list_filter = ('order_status', 'payment_method', 'payment_status')
    search_fields = ('order_id', 'full_name', 'email', 'phone')
    inlines = [OrderItemInline]


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'created_at')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user_name', 'rating', 'created_at')
    list_filter = ('rating',)
