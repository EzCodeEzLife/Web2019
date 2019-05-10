from django.urls import path
from api import views

urlpatterns = [
    path('task_lists/', views.TaskListList.as_view(), name='task_lists'),
    path('task_lists/<int:pk>/', views.task_list_detail),
    path('task_lists/<int:pk>/tasks/', views.TasksList.as_view(), name='tasks_list'),
    path('tasks/<int:pk>/', views.task_detail)
]


!!









from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})


@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_200_OK)



    mkdir pr1
    cd p1
    django-admin startproject proba1 .
    cd ..
    cd venv
    myvenv\Scripts\activate
    cd ..
    cd pr1
    py manage.py runserver
    py manage.py startapp api
    py manage.py migrate