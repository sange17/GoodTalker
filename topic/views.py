from django.shortcuts import render, get_object_or_404
from .models import Question
from .models import Choice

def show_topic(request):
    topics = Question.objects
    choices = Choice.objects
    # choices_friends = Choice.objects.filter(question_id=1)
    # choices_love = Choice.objects.filter(question_id=3)
    print("topics: {}".format(topics))
    print("choice: {}".format(choices))
    return render(request, 'show_topic.html', {'topics': topics, 'choices': choices})
