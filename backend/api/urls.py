from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    CategoryListView, ProductViewSet, CartView, CheckoutView, UserOrdersView,
    OrderDetailView, RegisterView, UserProfileView, WishlistView, AddReviewView
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('cart/', CartView.as_view(), name='cart'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('orders/', UserOrdersView.as_view(), name='user-orders'),
    path('orders/<str:order_id>/', OrderDetailView.as_view(), name='order-detail'),
    path('wishlist/', WishlistView.as_view(), name='wishlist'),
    path('products/<int:product_id>/reviews/', AddReviewView.as_view(), name='add-review'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/profile/', UserProfileView.as_view(), name='profile'),
]
