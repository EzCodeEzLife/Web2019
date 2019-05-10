from django.shortcuts import render

from auth_.serializers import UserSerializer
from rest_framework import authentication
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(serializer.data['password'])
        user.save()
        token, _ = Token.objects.get_or_create(user=user)
        context = {
            'key': token.key,
        }
        if user:
            return Response(context)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authentication.authenticate(username=username, password=password)
    if user is None:
        return Response({'user': user}, status=status.HTTP_400_BAD_REQUEST)

    token, _ = Token.objects.get_or_create(user=user)
    context = {
        'key': token.key,
    }
    return Response(context)


@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)