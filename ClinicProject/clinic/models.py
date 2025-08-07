from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Doctor(models.Model):
    DEPARTMENT_CHOICES = [
    ('General Medicine', 'General Medicine'),
    ('Pediatrics', 'Pediatrics'),
    ('Dermatology', 'Dermatology'),
    ('Orthopedics', 'Orthopedics'),
    ]
    SPECIALITY_CHOICES = [
    ('Physician', 'Physician'),
    ('Pediatrician', 'Pediatrician'),
    ('Dermatologist', 'Dermatologist'),
    ('Orthopedic Surgeon', 'Orthopedic Surgeon'),
    ]
    
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100, choices=DEPARTMENT_CHOICES)
    speciality = models.CharField(max_length=100, choices=SPECIALITY_CHOICES)

    def __str__(self):
        return self.name
    

class Appointment(models.Model):
    patient_name = models.CharField(max_length=100)
    age = models.IntegerField()
    appointment_date = models.DateField()
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.patient_name} - {self.appointment_date}"