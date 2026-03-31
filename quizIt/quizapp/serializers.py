from rest_framework import serializers
from .models import *

class quizSerializer(serializers.ModelSerializer):
    genre = serializers.SlugRelatedField(
    queryset=Option.objects.all(),
    slug_field="name"
    )
    class Meta:
        model = Quizer
        fields = "__all__"

class questionSerializer(serializers.ModelSerializer):
    genre = serializers.SlugRelatedField(
    queryset=Option.objects.all(),
    slug_field="name"
    )
    class Meta:
        model = Question
        fields = "__all__"
