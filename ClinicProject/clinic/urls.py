from django.urls import path
from .views import LoginView,UserProfileView, DoctorListView,AppointmentCreateView, AppointmentListView

urlpatterns = [
   
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserProfileView.as_view(), name='userprofile'),
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('appointments/', AppointmentCreateView.as_view(), name='book-appointment'),
    path('booked_list/', AppointmentListView.as_view(), name='booked_list'),
]