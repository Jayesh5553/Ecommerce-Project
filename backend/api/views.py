from decimal import Decimal
from rest_framework import generics, status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import Category, Product, Cart, CartItem, Order, OrderItem, Wishlist, Review
from .serializers import (
    CategorySerializer, ProductSerializer, CartSerializer, CartItemSerializer,
    OrderSerializer, WishlistSerializer, UserSerializer, RegisterSerializer, ReviewSerializer
)


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(
                Q(category__slug=category_slug) | Q(category__parent__slug=category_slug)
            )

        search_query = self.request.query_params.get('q', None)
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(brand__icontains=search_query) |
                Q(category__name__icontains=search_query)
            )

        brand = self.request.query_params.get('brand', None)
        if brand:
            brands = brand.split(',')
            queryset = queryset.filter(brand__in=brands)

        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(discount_price__gte=min_price)
        if max_price:
            queryset = queryset.filter(discount_price__lte=max_price)

        min_rating = self.request.query_params.get('min_rating', None)
        if min_rating:
            queryset = queryset.filter(rating__gte=min_rating)

        is_deal = self.request.query_params.get('deal', None)
        if is_deal:
            queryset = queryset.filter(is_deal_of_the_day=True)

        is_featured = self.request.query_params.get('featured', None)
        if is_featured:
            queryset = queryset.filter(is_featured=True)

        is_trending = self.request.query_params.get('trending', None)
        if is_trending:
            queryset = queryset.filter(is_trending=True)

      
        ordering = self.request.query_params.get('ordering', None)
        if ordering:
            if ordering == 'price_low':
                queryset = queryset.order_by('discount_price')
            elif ordering == 'price_high':
                queryset = queryset.order_by('-discount_price')
            elif ordering == 'rating':
                queryset = queryset.order_by('-rating')
            elif ordering == 'newest':
                queryset = queryset.order_by('-created_at')

        return queryset.distinct()


class CartView(APIView):
    permission_classes = [permissions.AllowAny]

    def _get_cart(self, request):
        if request.user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=request.user)
            return cart
        else:
            session_id = request.session.session_key
            if not session_id:
                request.session.create()
                session_id = request.session.session_key
            cart, _ = Cart.objects.get_or_create(session_id=session_id)
            return cart

    def get(self, request):
        cart = self._get_cart(request)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request):
        cart = self._get_cart(request)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def put(self, request):
        cart = self._get_cart(request)
        item_id = request.data.get('item_id')
        quantity = int(request.data.get('quantity', 1))

        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        if quantity <= 0:
            cart_item.delete()
        else:
            cart_item.quantity = quantity
            cart_item.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def delete(self, request):
        cart = self._get_cart(request)
        item_id = request.data.get('item_id', None)

        if item_id:
            cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
            cart_item.delete()
        else:
            cart.items.all().delete()

        serializer = CartSerializer(cart)
        return Response(serializer.data)


class CheckoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        user = request.user if request.user.is_authenticated else None
        cart_items_data = data.get('items', [])
        full_name = data.get('full_name', 'Valued Customer')
        email = data.get('email', 'customer@example.com')
        phone = data.get('phone', '9876543210')
        address = data.get('address', '123 Main St, Tech City')
        city = data.get('city', 'Mumbai')
        state = data.get('state', 'Maharashtra')
        pincode = data.get('pincode', '400001')
        payment_method = data.get('payment_method', 'UPI')

        total_mrp = Decimal('0.00')
        total_discount_price = Decimal('0.00')
        items_to_create = []
        if cart_items_data:
            for item in cart_items_data:
                product_id = item.get('product_id')
                qty = int(item.get('quantity', 1))
                product = get_object_or_404(Product, id=product_id)
                total_mrp += product.price * qty
                total_discount_price += product.discount_price * qty
                items_to_create.append((product, qty, product.discount_price))
        else:
            if user:
                cart = Cart.objects.filter(user=user).first()
            else:
                session_id = request.session.session_key
                cart = Cart.objects.filter(session_id=session_id).first()

            if not cart or not cart.items.exists():
                return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

            for item in cart.items.all():
                total_mrp += item.product.price * item.quantity
                total_discount_price += item.product.discount_price * item.quantity
                items_to_create.append((item.product, item.quantity, item.product.discount_price))

        total_discount = total_mrp - total_discount_price
        delivery_fee = Decimal('0.00') if total_discount_price >= Decimal('500.00') else Decimal('40.00')
        final_amount = total_discount_price + delivery_fee

        order = Order.objects.create(
            user=user,
            full_name=full_name,
            email=email,
            phone=phone,
            address=address,
            city=city,
            state=state,
            pincode=pincode,
            payment_method=payment_method,
            payment_status='Paid' if payment_method != 'COD' else 'Pending',
            order_status='Order Placed',
            total_mrp=total_mrp,
            total_discount=total_discount,
            delivery_fee=delivery_fee,
            final_amount=final_amount
        )

        for prod, qty, price in items_to_create:
            OrderItem.objects.create(
                order=order,
                product=prod,
                quantity=qty,
                price=price
            )

        if user and hasattr(user, 'cart'):
            user.cart.items.all().delete()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Order.objects.filter(user=self.request.user)
        return Order.objects.all()[:5] 


class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    lookup_field = 'order_id'
    permission_classes = [permissions.AllowAny]


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class WishlistView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if request.user.is_authenticated:
            wishlist = Wishlist.objects.filter(user=request.user)
        else:
            wishlist = Wishlist.objects.all()[:10]
        serializer = WishlistSerializer(wishlist, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id)

        if request.user.is_authenticated:
            wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product)
            if not created:
                wishlist_item.delete()
                return Response({'status': 'removed', 'message': 'Removed from Wishlist'})
            return Response({'status': 'added', 'message': 'Added to Wishlist'})
        else:
            return Response({'status': 'added', 'message': 'Saved to guest Wishlist'})


class AddReviewView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)
        user_name = request.data.get('user_name', 'Verified Customer')
        rating = int(request.data.get('rating', 5))
        comment = request.data.get('comment', '')

        review = Review.objects.create(
            product=product,
            user_name=user_name,
            rating=rating,
            comment=comment
        )
        reviews = product.reviews.all()
        avg_rating = sum(r.rating for r in reviews) / len(reviews)
        product.rating = round(avg_rating, 1)
        product.review_count = len(reviews)
        product.save()

        serializer = ReviewSerializer(review)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
