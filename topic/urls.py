from django.urls import path
from . import views

app_name = "topic"

urlpatterns = [
    path('', views.show_topic, name='topic'),
]