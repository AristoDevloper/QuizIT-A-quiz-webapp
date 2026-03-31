from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import quizSerializer,questionSerializer
from .models import *
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.
def home(request):
    return render(request,'home.html')

def genrePage(request):
    return render(request,'genre.html')

def about_page(request):
    return render(request, 'aboutPage.html')

@api_view(['POST'])
def quizValidity(request):
    serializer = quizSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def quizPage(request):
    return render(request,"quiz.html")

def resultPage(request):
    return render(request,"resultPage.html")
    
@api_view(['GET'])
def quizQuestions(request):
    genre = request.GET.get("selected_genre")
    print("genre:",genre)
    if genre:
        genre_questions = Question.objects.filter(genre__name=genre)
    else:
        genre_questions = Question.objects.all()
    serializer = questionSerializer(genre_questions, many=True)
    return Response(serializer.data)


# FOR ADDING QUESTIONS TO THE DATABASE
@api_view(['GET'])
def questionadder(request):
    questions = [] # Add your list of question dictionaries here

    for item in questions:
        question = Question(
            genre = Option.objects.get(name="programming"),
            question = item['question'],
            rightAnswer = item['rightAnswer'],
            wrongAnswer1 = item['wrongAnswer1'],
            wrongAnswer2 = item['wrongAnswer2'],
            wrongAnswer3 = item['wrongAnswer3']
        )
        question.save()

    return JsonResponse({"message":"Questions added successfully"})