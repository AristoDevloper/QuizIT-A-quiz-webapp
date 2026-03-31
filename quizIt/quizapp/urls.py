from django.urls import path
from .views import *

urlpatterns = [
    path('',home, name='homePage'),
    path('about/',about_page,name='aboutpage'),
    path('genreChoose/',genrePage, name='genres'),
    path('quizValidity/',quizValidity, name='quizValidity'),
    path('quizPage/', quizPage, name='quizPage'),
    path('quizQuestions/',quizQuestions, name="quiz-questions"),
    path('resultPage/',resultPage,name='resultPage'),
    path('questionadder/',questionadder,name='questionadder'),
]
