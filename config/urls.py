from django.contrib import admin
from django.urls import path, include
import index.views
import topic.views
import voice.views
import analysis.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index.views.index, name='index'),
    path('topic/', include('topic.urls')),
    path('analysis/', include('analysis.urls')),
    path('voice/', include('voice.urls')),
]