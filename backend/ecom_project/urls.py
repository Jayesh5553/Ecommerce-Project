from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def api_root_view(request):
    return JsonResponse({
        "status": "online",
        "message": "Ecommerce REST API is running successfully!",
        "endpoints": {
            "products": "/api/products/",
            "categories": "/api/categories/",
            "cart": "/api/cart/",
            "orders": "/api/orders/",
            "admin": "/admin/"
        }
    })

urlpatterns = [
    path('', api_root_view, name='root'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
