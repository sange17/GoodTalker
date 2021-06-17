from django.shortcuts import render


def get_voice(request):
    return render(request, 'get_voice.html')
