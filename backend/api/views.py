from django.contrib.auth.models import User
from django.shortcuts import render
from api.serializers import UserSerializer
from django.contrib.auth import login
from rest_framework.exceptions import APIException
from rest_framework import permissions, viewsets, generics
from rest_framework.views import APIView
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from knox.views import LoginView as KnoxLoginView
from django_filters import FilterSet, NumberFilter, CharFilter


# Because Knox default auth aren't really confort
class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return super(LoginView, self).post(request, format=None)


class UserFilter(FilterSet):
    profile__age = NumberFilter(field_name="profile__age", lookup_expr="exact")
    profile__gender = CharFilter(field_name="profile__gender", lookup_expr="exact")

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "profile__age",
            "profile__city",
            "profile__gender",
        ]


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    filterset_class = UserFilter

    def get_queryset(self):
        # Always prefetch related fields
        queryset = User.objects.prefetch_related("profile").order_by("id")
        return queryset
