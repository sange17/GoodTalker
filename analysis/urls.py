from django.urls import path
from . import views

app_name = "analysis"

urlpatterns = [
    path('analysis', views.show_analysis, name='analysis'),
    path('loading', views.loading, name='loading'),
]