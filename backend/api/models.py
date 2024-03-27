from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    MALE = "male"
    FEMALE = "female"
    UNKNOWN = "unknown"

    GENDER_CHOICES = [
        (MALE, "Male"),
        (FEMALE, "Female"),
        (UNKNOWN, "Unknown"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    city = models.CharField(max_length=80, blank=True)
    age = models.PositiveIntegerField(null=True)
    gender = models.CharField(max_length=10, default=UNKNOWN, choices=GENDER_CHOICES)

    # Always create a profile once a user are created
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if not created:
            return
        Profile.objects.create(user=instance)
