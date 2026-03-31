from django.db import models

# Create your models here.

class Option(models.Model):
    name = models.CharField(max_length=100,unique=True)

    def __str__(self):
        return self.name
    
class Quizer(models.Model):
    username = models.CharField(max_length=50)
    genre = models.ForeignKey(Option,on_delete=models.CASCADE)

    def __str__(self):
        return self.username
    
class Question(models.Model):
    genre = models.ForeignKey(Option,on_delete=models.CASCADE,null=True)
    question = models.CharField(max_length=100)
    rightAnswer = models.CharField(max_length=50)
    wrongAnswer1 = models.CharField(max_length=50)
    wrongAnswer2 = models.CharField(max_length=50)
    wrongAnswer3 = models.CharField(max_length=50)

    def __str__(self):
        return self.genre.name