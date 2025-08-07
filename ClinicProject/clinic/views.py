from django.shortcuts import render
from django.http import HttpResponse
# from datetime import date
from rest_framework import status ,permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from .models import Doctor, Appointment 
from .serializers import DoctorSerializer,AppointmentSerializer,UserSerializer

# Create your views here.


class LoginView(APIView):
    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")
        print("username", username)
        print("password", password)
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
           
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class DoctorListView(APIView):
    def get(self, request):
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)
    
class AppointmentCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        print("request.data",request.data)
        serializer = AppointmentSerializer(data=request.data, context={'request': request})
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        appointments = Appointment.objects.filter(user=request.user)
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)