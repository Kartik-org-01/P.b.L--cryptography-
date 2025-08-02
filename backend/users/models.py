from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    age = models.PositiveIntegerField(null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    gender_choices = [('Male','Male'), ('Female','Female'), ('Other','Other')]
    gender = models.CharField(max_length=10, choices=gender_choices, default='Other')
    night_mode = models.BooleanField(default=False)
    anonymous_mode = models.BooleanField(default=False)
    avatar = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.username
