from rest_framework import serializers
from django.db import transaction

from django.contrib.auth.models import User
from api.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "city",
            "age",
            "gender",
        ]


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        read_only_fields = ["id"]
        fields = read_only_fields + [
            "username",
            "email",
            "first_name",
            "last_name",
            "profile",
        ]

    def validate(self, attrs):
        # For now, I don't see much to check on our current format, but else it would be here.
        # Raising some serializers.ValidationError !
        return attrs

    @transaction.atomic
    def update(self, instance, validated_data):
        profile = validated_data.pop("profile", {})
        User.objects.filter(id=instance.id).update(**validated_data)

        if profile:
            Profile.objects.filter(user=instance).update(**profile)

        updated_instance = User.objects.get(id=instance.id)
        return updated_instance

    @transaction.atomic
    def create(self, validated_data):
        profile = validated_data.pop("profile", {})
        user = User.objects.create(**validated_data)

        # Profile are created from the signal
        if profile:
            Profile.objects.filter(user=user).update(**profile)

        updated_instance = User.objects.get(id=user.id)
        return updated_instance
