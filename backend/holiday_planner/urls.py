from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/search/', include('search_feature.urls')),
    path('api/auth/', include('authentication.urls')),
    path('api/user/', include('user_profile.urls')),
    path('api/planner/', include('planner.urls')),
]
