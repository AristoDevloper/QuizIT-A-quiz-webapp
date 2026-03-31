from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Quizer)
admin.site.register(Question)
admin.site.register(Option)

# admin password quizermon