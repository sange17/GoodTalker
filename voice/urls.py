from django.urls import path
from . import views

app_name = "voice"

urlpatterns = [
    path('', views.get_voice, name='voice'),
]